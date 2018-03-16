import { call, put } from 'redux-saga/effects'
import depGraphHelper from '../helpers/depGraphHelper'
import { updateFieldValue, updatePicklistFields, showError } from '../actions'

export default function* depGraphValueUpdater (action) {
    try {

        // make a deep copy to not mess with the real state.
        const editValues = JSON.parse(JSON.stringify(action.editValues));

        const modalFieldsMap = {}
        for (var modalField of action.modalFields){
            modalFieldsMap[modalField.apiName] = modalField
        }

        // traverse down to the target field in the tree.
        const field = modalFieldsMap[action.field];
        var treeNode = action.fieldTree;
        for (var i = field.controllingFields.length -1; i>=0; i--) {
            var controllingField = field.controllingFields[i]
            treeNode = treeNode[controllingField];
        }

        treeNode = treeNode[action.field];

        // now treeNode is the sub-tree rooted at the target field

        // do simple update of this field
        yield put(updateFieldValue(action.field, action.value));
        editValues[action.field].current = action.value

        //queue
        var queue = []
        queue.push(treeNode)
        while(queue.length > 0){
            var currentTreeNode = queue.shift()
            for (const childField of Object.keys(currentTreeNode)) {
                const childNode = currentTreeNode[childField];
                const currentField = modalFieldsMap[childField];
        
                // update the legal values for this field.
                const legalValues = depGraphHelper.getLegalValues(action.picklists, currentField, editValues);
                const legalValuesByField = new Map();
                legalValuesByField.set(childField,legalValues);
                yield put(updatePicklistFields(legalValuesByField));
        
                // make sure the current value is legal.
                const currentValue = editValues[currentField.apiName].current;
        
                var found = false;
                if (legalValues) { // if no legalValues, checkbox, all values legal.
                    if (legalValues == []) {
                        yield put(updateFieldValue(currentField.apiName, null));
                        editValues[currentField.apiName].current = null
                        queue.push(childNode)
                    } else {
                        legalValues.forEach(legalValue => {
                            if (legalValue.value == currentValue) {
                                found = true
                            }
                        });
        
                        if (!found) {
                            yield put(updateFieldValue(currentField.apiName, legalValues[0].value));
                            editValues[currentField.apiName].current = legalValues[0].value
                            queue.push(childNode)
                        }
                    }
                }
            }
        }
    } catch(err) {
        console.error('Create defaults fetch error: ' + JSON.stringify(err))
    }
}
