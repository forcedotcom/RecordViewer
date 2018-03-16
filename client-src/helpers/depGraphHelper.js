function getParentToChildPicklistValues(picklists, modalFields, editValues){
    // create a new map to fill in
    const picklistCollectionMap = new Map()
    for (let modalFieldIndex in modalFields){
        const field = modalFields[modalFieldIndex]
        const picklistValue = picklists.fieldValues[modalFields[modalFieldIndex].apiName]
        const individualValueObjects = getLegalValues(picklists, field, editValues)
        picklistCollectionMap.set(field.apiName,individualValueObjects)
    }
    return picklistCollectionMap
}
    
function getLegalValues(picklists, field, editValues){
    const picklistValue = picklists.fieldValues[field.apiName]
    if (picklistValue){
        if (isEmpty(picklistValue.controllerValues)){
            return picklistValue.values.map(v => ({value: v.value, label: v.label}));
        } else {
    
            // fill in picklistFields
            const individualValueObjects = [];
            const parentField = field.controllerName
            let parentFieldValue = editValues[parentField].current
            
            if (parentFieldValue != null){
                parentFieldValue = parentFieldValue.toString()
            }
            let validForIndex = -1
            if (picklistValue.controllerValues[parentFieldValue] != null){
                validForIndex = picklistValue.controllerValues[parentFieldValue]
            }
            picklistValue.values.forEach((individualValue) => {
                if (isInArray(validForIndex,individualValue.validFor)){    
                    individualValueObjects.push({
                        value: individualValue.value,
                        label: individualValue.label
                    });
                }
            });
            return individualValueObjects
        }
    } else {
        return []
    }
}
    
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
    
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}
    
export default { getParentToChildPicklistValues, getLegalValues }