import React, { PropTypes } from 'react'

import RecordSection from './RecordSection'
import RecordButton from './RecordButton'

// Component that displays a Record.
const Record = ({creds, error, layoutMode, uiMode, recordView, picklists, onBackClick, onCloneClick, onDeleteClick, onEditClick, onSaveClick, onSaveNewClick, onFieldValueUpdate, onFetchPicklist}) => {
  // TODO: support layouts other than Full.
  let allowEdit = (uiMode !== 'View');
  return (
    <div>
      <table className="slds-table" style={{"width":"auto"}}>
       {recordView.layouts.Full[layoutMode].map((section, i) =>
        <RecordSection
            allowEdit={allowEdit}
            key={'section' + i}
            onFieldValueUpdate={onFieldValueUpdate}
            onFetchPicklist={(url) => onFetchPicklist(creds, url)}
            picklists={picklists}
            error={error}
            editValues={recordView.editValues}
            section={section}
            index={i} />
      )}
      </table>
      <div className="slds-p-left--medium slds-p-top--small slds-p-botom--medium">
        <RecordButton label='Back' onClick={onBackClick} />
        { uiMode === 'View' &&
          <RecordButton label='Delete' onClick={() => onDeleteClick(creds, recordView.recordId)} />
        }
        { uiMode === 'View' &&
          <RecordButton label='Edit' onClick={() => onEditClick(creds, recordView.recordId)} />
        }
        { uiMode === 'View' &&
          <RecordButton label='Clone' onClick={() => onCloneClick(creds, recordView.recordId)} />
        }
        { uiMode === 'Edit' &&
          <RecordButton label='Save' onClick={() => onSaveClick(creds, recordView.recordId, recordView.objectInfo, recordView.editValues)} />
        }
        { (uiMode === 'Create' || uiMode === 'Clone') &&
          <RecordButton label='Save' onClick={() => onSaveNewClick(creds, recordView.apiName, recordView.objectInfo, recordView.editValues)} />
        }
      </div>
    </div>
  )
}

// layoutMode = the mode of the layout to use. for Clone this will be 'Edit'.
// uiMode = mode of this UI. this may be 'Clone'.
Record.propTypes = {
  error: PropTypes.object.isRequired,
  creds: PropTypes.object.isRequired,
  layoutMode: PropTypes.string.isRequired,
  uiMode: PropTypes.string.isRequired,
  recordView: PropTypes.object.isRequired,
  picklists: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onCloneClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onSaveNewClick: PropTypes.func.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  onFetchPicklist: PropTypes.func.isRequired
}

export default Record
