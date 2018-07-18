import React, { PropTypes } from 'react';

import RecordButton from './RecordButton'

// Header: form factor and record selector
const RecordHeader = ({formFactor, recordId, onFormFactorSelect, onRecordIdUpdate, onViewRecordClick}) => {
  return (
      <div className="slds-grid slds-form-element">

        <div className="slds-col--padded">
          <label className="slds-form-element__label" htmlFor="formFactor">Form Factor</label>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select id="formFactor" className="slds-select" value={formFactor} onChange={(event) => onFormFactorSelect(event.target.value)}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
        </div>

        <div className="slds-col--padded">
          <label className="slds-form-element__label" htmlFor="recordId">ID</label>
          <div className="slds-form-element__control">
            <input id="recordId" className="slds-input" type="text" value={recordId} onChange={(event) => onRecordIdUpdate(event.target.value)} />
          </div>
        </div>

        <div className="slds-col--padded" style={{"paddingRight": "0", "paddingTop": "1.5em", "maxWidth": "10em"}}>
          <RecordButton label='View Record' onClick={() => onViewRecordClick(recordId)} />
        </div>
      </div>
  )
}

RecordHeader.propTypes = {
  formFactor: PropTypes.string.isRequired,
  recordId: PropTypes.string,
  onFormFactorSelect: PropTypes.func.isRequired,
  onRecordIdUpdate: PropTypes.func.isRequired,
  onViewRecordClick: PropTypes.func.isRequired
}

export default RecordHeader
