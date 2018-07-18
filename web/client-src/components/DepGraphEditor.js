import React, { PropTypes } from 'react'
import RecordButton from './RecordButton'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

function createNodeMap(fieldTree, nodeMap = [], size = 0 ) {
  for (var property in fieldTree) {
      nodeMap.push({property, size});
      createNodeMap(fieldTree[property], nodeMap, size + 1);
  }
  return nodeMap;
}

function getEditorNodes(fieldTree, fieldComponents, fieldLabels){
  const nodeArray = createNodeMap(fieldTree);
  const nodeElArray  = [];
  nodeArray.forEach((value, key, nodeArray) => {
      var divStyle = {
        paddingLeft: ''+ 100 * value.size + 'px'
      };

      var nodeEl = <div key={"depGraphEdit" + value.property} style={divStyle}>{fieldLabels[value.property]} : {fieldComponents[value.property]}</div>
      nodeElArray.push(nodeEl);
  });
  return nodeElArray;
}

// Dependency graph editor
const DepGraphEditor = ({depGraph, picklists, editValues, onFieldValueUpdate, onClose}) => {
  let fieldComponents = {}
  let fieldLabels = {}
  depGraph.modalFields.map(
    (field) => {
      if (field.dataType == "Picklist") {
        fieldComponents[field.apiName] = 
          <select
            key={'depGraph' + field.apiName}
            value={editValues[field.apiName].current}
            onChange={(event) => onFieldValueUpdate(
              field.apiName, 
              event.target.value, 
              editValues,
              picklists, 
              depGraph.modalFields, 
              depGraph.fieldTree)}>
              { depGraph.picklistFields.get(field.apiName).map((picklistValue) => {
                  return (
                    <option
                      key={picklistValue.value}
                      value={picklistValue.value}>{picklistValue.label}</option>)
                })}
            </select>
      } else if (field.dataType == "Boolean" ) {
        fieldComponents[field.apiName] =
          <input
            type="checkbox"
            className="fieldEdit"
            key={'depGraph' + field.apiName}
            name={field.apiName}
            value={editValues[field.apiName].current}
            onChange={(event) => onFieldValueUpdate(
              field.apiName, 
              new Boolean(!editValues[field.apiName].current).valueOf(), 
              editValues,
              picklists, 
              depGraph.modalFields, 
              depGraph.fieldTree)}
            data-datatype={field.dataType}/>
      }

      fieldLabels[field.apiName] = field.label
    }
  );

  return (
    <div key="depGraphContainer">
      <ModalContainer >
        <ModalDialog>
          <div key="depGraphNodes">
            { getEditorNodes(depGraph.fieldTree, fieldComponents, fieldLabels) }
          </div>
          <div className="slds-p-left--medium slds-p-top--small slds-p-botom--medium" key="depGraphCloseButtonDiv">
            <RecordButton key="depGraphCloseButton" label='Close' onClick={onClose} />
          </div>
        </ModalDialog>
      </ModalContainer>
    </div>
  )
}

DepGraphEditor.propTypes = {
  depGraph: PropTypes.object.isRequired,
  picklists: PropTypes.object.isRequired,
  editValues: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired
}

export default DepGraphEditor
