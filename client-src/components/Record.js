import React, { PropTypes } from 'react'

import RecordSection from './RecordSection'
import RecordButton from './RecordButton'
import DepGraphEditor from './DepGraphEditor'

// Component that displays a Record.
const Record = ({creds, error, layoutMode, uiMode, prevMode, recordView, picklists, depGraph, onBackClick, onCloneClick, onDeleteClick, onEditClick, onSaveClick, onSaveNewClick, onFieldValueUpdate, onDepGraphFieldValueUpdate, onDepGraphClose, onEditDepGraph}) => {
  
  let recordType = '012000000000000AAA'; // 'Master'
  if (recordView.record && recordView.record.recordTypeInfo) {
    recordType = recordView.record.recordTypeInfo.recordTypeId;
  }

  
  if (layoutMode == "Clone"){
    layoutMode = "Edit"
  }

  // TODO: support layouts other than Full.
  let allowEdit = (uiMode !== 'View');
  return (
  <div>
    {uiMode === 'EditDepGraph' &&
      <DepGraphEditor 
          depGraph={depGraph}
          picklists={picklists}
          editValues={recordView.editValues}
          onFieldValueUpdate={onDepGraphFieldValueUpdate}
          onClose={() => onDepGraphClose(prevMode)}/> }
    <table className="slds-table" style={{"width":"auto"}}>
      {recordView.layouts.Full[layoutMode].map((section, i) =>
      <RecordSection
          allowEdit={allowEdit}
          uiMode={uiMode}
          key={'section' + i}
          onFieldValueUpdate={onFieldValueUpdate}
          picklists={picklists}
          error={error}
          editValues={recordView.editValues}
          section={section}
          index={i} 
          objectInfo={recordView.objectInfo}
          onEditDepGraph={onEditDepGraph}
          recordView={recordView}/>
    )}
    </table>
    <div className="slds-p-left--medium slds-p-top--small slds-p-botom--medium">
      <RecordButton label='Back' onClick={onBackClick} />
      { uiMode === 'View' &&
        <RecordButton label='Delete' onClick={() => onDeleteClick(creds, recordView.recordId)} />
      }
      { uiMode === 'View' &&
        <RecordButton label='Edit' onClick={() => onEditClick(creds, recordView.objectInfo.apiName, recordType)} />
      }
      { uiMode === 'View' &&
        <RecordButton label='Clone' onClick={() => onCloneClick(creds, recordView.recordId, recordView.record.apiName, recordType)} />
      }
      { uiMode === 'Edit' &&
        <RecordButton label='Save' onClick={() => onSaveClick(creds, recordView.recordId, recordView.objectInfo, recordView.editValues)} />
      }
      { (uiMode === 'Create' || uiMode === 'Clone') &&
        <RecordButton label='Save' onClick={() => onSaveNewClick(creds, recordView.apiName, recordView.objectInfo, recordView.editValues)} />
      }
    </div>
  </div> )
}

// layoutMode = the mode of the layout to use. for Clone this will be 'Edit'.
// uiMode = mode of this UI. this may be 'Clone'.
Record.propTypes = {
  error: PropTypes.object.isRequired,
  creds: PropTypes.object.isRequired,
  layoutMode: PropTypes.string.isRequired,
  prevMode: PropTypes.string,
  uiMode: PropTypes.string.isRequired,
  recordView: PropTypes.object.isRequired,
  picklists : PropTypes.object,
  depGraph: PropTypes.object,
  onBackClick: PropTypes.func.isRequired,
  onCloneClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onSaveNewClick: PropTypes.func.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  onDepGraphFieldValueUpdate: PropTypes.func.isRequired,
  onEditDepGraph: PropTypes.func.isRequired,
  onDepGraphClose: PropTypes.func.isRequired
}

export default Record
