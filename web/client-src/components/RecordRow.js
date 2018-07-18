import React, { PropTypes } from 'react';

const getViewItemCells = (item, itemLabel, nonEmptyItem) => {

  if (item.customLinkUrl) { // TODO: concat instanceUrl to the start of these custom link urls
    return (
      <td className="slds-cell-wrap" key={'customLink' + itemLabel}><a href={item.customLinkUrl}>{item.linkText}</a></td>
    );
  } else if (item.customText) {
    return [
      <td className="slds-cell-wrap" key={'label' + itemLabel}>{item.label}</td>,
      <td className="slds-cell-wrap" key={'value' + itemLabel} style={{"maxWidth":"300px"}}>{item.customText}</td>
    ];
  } else {
    return [
      <td className="slds-cell-wrap" key={'label' + itemLabel}>{item.label}</td>,
      <td className="slds-cell-wrap" key={'value' + itemLabel} style={{"maxWidth":"300px"}}>
        { item.linkId &&
          <a href={"/recordView?recordId=" + item.linkId}><label key={'linkTo' + itemLabel}>{item.linkText}</label></a>
        }
        { !item.linkId && !item.customLinkUrl && !nonEmptyItem &&
          <label key={'componentEmpty' + itemLabel}>-</label>
        }
        { !item.linkId && !item.customLinkUrl && nonEmptyItem &&
          <div key={'compList' + itemLabel}>
          { item.values.map((component, i) => {
             if (component.displayValue && component.displayValue.length > 0) {
               if (component.fieldInfo.htmlFormatted) {
                 return (
                   <div key={'component' + itemLabel + ',' + i} dangerouslySetInnerHTML={{__html: component.displayValue}}></div>
                 )
               } else {
                 return (
                   <div key={'component' + itemLabel + ',' + i}>{component.displayValue}</div>
                 )
               }
             } else {
               return null
             }
           }
          )}
          </div>
        }
      </td>
    ];
  }
}

const getFlattenedTree = (objectInfo, fieldTree, rootField) => {
  const flattenedTree = []
  flattenedTree.push(objectInfo.fields[rootField])
  doFlattenTree(objectInfo, fieldTree, flattenedTree)
  return flattenedTree
}

const doFlattenTree = (objectInfo, tree, flattenedTree) => {
  if (tree) {
    let treeKeys = Object.keys(tree)
    for (var treeKey in treeKeys){
      flattenedTree.push(objectInfo.fields[treeKeys[treeKey]])
      doFlattenTree(objectInfo, tree[treeKeys[treeKey]], flattenedTree)
    }
  }
}

const getEditComponent = (component, picklists, onFieldValueUpdate, editValues, itemLabel, i, objectInfo, onEditDepGraph, uiMode, recordView) => {
  let isPicklist = (component.fieldInfo && component.fieldInfo.dataType == 'Picklist');
  let currPicklistValue = "";
  let picklistValues = [];

  if (isPicklist) {
    currPicklistValue = editValues[component.field].current;
    if (currPicklistValue == null) {
      currPicklistValue = "";
    }
    
    if (picklists.fieldValues && picklists.fieldValues[component.field]) {
      picklistValues = picklists.fieldValues[component.field].values;
    } else {
      // picklist collection fetch has not completed yet, or the field is somehow missing from its results.
      // add the current value so that it shows nicely in the UI.
      picklistValues.push({value: component.value, label: component.displayValue})
    }
  }

  if (objectInfo 
    && ((component.field && component.field in objectInfo.dependentFields)
       || (component.fieldInfo && component.fieldInfo.controllingFields.length > 0))) {
    // last field in controlling fields is the root field
    let lastControllingIndex =  component.fieldInfo.controllingFields.length - 1
    let rootField = null
    if (component.field in objectInfo.dependentFields){
      rootField = component.field
    } else {
      rootField = component.fieldInfo.controllingFields[lastControllingIndex]
    }
    
    // retrieve the picklist fields that need to show up
    const subfieldTree = objectInfo.dependentFields[rootField]
    const modalFields = getFlattenedTree(objectInfo, subfieldTree, rootField)

    // open a modal on click of input field
    let fieldTree = {}
    fieldTree[rootField] = subfieldTree
  
    return (
      <div>
        <label
          key={'componentInput' + itemLabel + ',' + i}
          onClick={(event) => onEditDepGraph(picklists, modalFields, editValues, fieldTree, uiMode.toString())}
          value={currPicklistValue}>
          {editValues[component.field].current}
        </label>
        <button className="fa fa-pencil"
        key={'componentInput' + itemLabel + 'button,' + i}
        onClick={(event) => onEditDepGraph(picklists, modalFields, editValues, fieldTree, uiMode.toString())}>
        </button>
      </div>
    );
  }

  if (isPicklist) {
    return (
      <select
        key={component.picklistUrl}
        value={currPicklistValue}
        onChange={(event) => onFieldValueUpdate(component.field, event.target.value)}>
        { picklistValues.map((picklistValue) => {
          return <option
            key={picklistValue.value}
            value={picklistValue.value}>{picklistValue.label}</option>
        })}
      </select>
    );
  } else {
    let currentVal = editValues[component.field].current;
    let currentValStr = "";
    if (currentVal != null) {
      currentValStr = currentVal.toString();
    }
    let componentType = 'text'
    if(component && component.fieldInfo.dataType == "Boolean") {
      componentType = 'checkbox'
      currentValStr = currentVal;
    }
    return (
      <input
        type={componentType}
        className="fieldEdit"
        name={component.field}
        value={currentValStr}
        onChange={(event) => onFieldValueUpdate(component.field, event.target.value)}
        key={'componentInput' + itemLabel + ',' + i}
        data-isnull={component.isNull}
        data-datatype={component.fieldInfo.dataType}/>
    );
  }
}

const getEditItemCells = (item, picklists, onFieldValueUpdate, error, editValues, itemLabel, nonEmptyItem, objectInfo, onEditDepGraph, uiMode, recordView) => {
  return (
    <td className="slds-cell-wrap" key={'editItemCell' + itemLabel} style={{"maxWidth":"350px"}}>
      { item.customLinkUrl &&
        <label key={'customLink' + itemLabel}>{item.linkText + ' ' + item.customLinkUrl}</label>
      }
      <table className="slds-table" key={'editItemTable' + itemLabel} style={{"width":"350px"}}>
        <tbody>
        {item.values.map((component, i) => {
          let fieldError = error.fieldErrors ? error.fieldErrors[component.field] : null;
          return (
            <tr key={"editItemTableRow" + itemLabel + ',' + i}>
              <td key={"editItemTableLabel" + itemLabel + ',' + i} className="slds-cell-wrap" style={{"width":"100px"}}>{component.label}</td>
              <td key={"editItemTableValue" + itemLabel + ',' + i} className="slds-cell-wrap" style={{"width":"250px"}}>
                { component.required &&
                  <span className="slds-required">*</span>
                }
                { component.editableForUpdate &&
                  getEditComponent(component, picklists, onFieldValueUpdate, editValues, itemLabel, i, objectInfo, onEditDepGraph, uiMode, recordView)
                }
                { !component.editableForUpdate &&
                  <label key={'component' + itemLabel + ',' + i}>{component.displayValue}</label>
                }
                { fieldError &&
                  <div
                    key={"editItemTableError" + itemLabel + ',' + i}
                    className="slds-text-color--error"
                    data-fielderror={component.field}>{fieldError.message}</div>
                }
              </td>
            </tr>
          );
         })
        }
        </tbody>
      </table>
    </td>
  );
}

// Component that displays a Record row. May include multiple items. JSX doesn't allow us to return
// fragments made up of multiple <td>s without wrapping them in a single element so we can't break out
// RecordItem into a separate component.
const RecordRow = ({row, allowEdit, error, editValues, picklists, onFieldValueUpdate, sectionIndex, rowIndex, objectInfo, onEditDepGraph, uiMode, recordView}) => {
  let rowLabel = sectionIndex + ',' + rowIndex;

  return (
    <tr key={'row' + rowLabel}>
      {row.items.map((item, i) => {
         let itemLabel = rowLabel + ',' + i
         let nonEmptyItem = item.values.find((component) => component.displayValue && (component.displayValue.length > 0))
         if (!allowEdit) {
           return getViewItemCells(item, itemLabel, nonEmptyItem);
         } else {
           return getEditItemCells(item, picklists, onFieldValueUpdate, error, editValues, itemLabel, nonEmptyItem, objectInfo, onEditDepGraph, uiMode, recordView);
        }
      })}
    </tr>
  );
}

RecordRow.propTypes = {
  row: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  allowEdit: PropTypes.bool.isRequired,
  editValues: PropTypes.object.isRequired,
  picklists: PropTypes.object,
  sectionIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  objectInfo: PropTypes.object.isRequired,
  onEditDepGraph: PropTypes.func.isRequired,
  uiMode: PropTypes.string.isRequired,
  recordView: PropTypes.object.isRequired 
}

export default RecordRow