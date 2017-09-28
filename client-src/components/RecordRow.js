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

const getEditComponent = (component, picklists, onFetchPicklist, onFieldValueUpdate, editValues, itemLabel, i) => {
  if (component.picklistUrl) {
    let value = editValues[component.field].current;
    if (value == null) {
      value = "";
    }

    let picklistValues = [];
    let hasPicklistValues = false;
    if (picklists[component.picklistUrl]) {
      picklistValues = picklists[component.picklistUrl].values;
      hasPicklistValues = true;
    } else {
      // add the current value so that it shows nicely in the UI.
      picklistValues.push({value: component.value, label: component.displayValue})
    }

    return (
      <select
        key={component.picklistUrl}
        value={value}
        onChange={(event) => onFieldValueUpdate(component.field, event.target.value)}
        onFocus={(event) => {
          if (!hasPicklistValues) {
            onFetchPicklist(component.picklistUrl);
          }
        }} >
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

    return (
      <input
        type="text"
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

const getEditItemCells = (item, picklists, onFetchPicklist, onFieldValueUpdate, error, editValues, itemLabel, nonEmptyItem) => {
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
                { component.fieldInfo.required &&
                  <span className="slds-required">*</span>
                }
                { component.editableForUpdate &&
                  getEditComponent(component, picklists, onFetchPicklist, onFieldValueUpdate, editValues, itemLabel, i)
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
const RecordRow = ({row, allowEdit, error, editValues, picklists, onFetchPicklist, onFieldValueUpdate, sectionIndex, rowIndex}) => {

  let rowLabel = sectionIndex + ',' + rowIndex;

  return (
    <tr key={'row' + rowLabel}>
      {row.items.map((item, i) => {
         let itemLabel = rowLabel + ',' + i
         let nonEmptyItem = item.values.find((component) => component.displayValue && (component.displayValue.length > 0))
         if (!allowEdit) {
           return getViewItemCells(item, itemLabel, nonEmptyItem);
         } else {
           return getEditItemCells(item, picklists, onFetchPicklist, onFieldValueUpdate, error, editValues, itemLabel, nonEmptyItem);
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
  picklists: PropTypes.object.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  onFetchPicklist: PropTypes.func.isRequired
}

export default RecordRow
