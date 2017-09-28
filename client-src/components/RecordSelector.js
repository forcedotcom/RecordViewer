import React, { PropTypes } from 'react';

// Record / layout type / form factor selector + "view record" button
const RecordSelector = () => {
  return (
    <div className="slds-page-header" role="banner">
      <div className="slds-grid slds-grid--pull-padded slds-form-element">

        <div className="slds-col--padded">
          <div className="slds-page-header__title" id="goHome" style={{"cursor":"pointer"}}>Record Viewer</div>
          <div className="slds-page-header__info"> powered by UI API</div>
        </div>

        <div className="slds-col--padded">
          <label className="slds-form-element__label" htmlFor="recordId">ID</label>
          <div className="slds-form-element__control">
            <input id="recordId" className="slds-input" type="text" />
          </div>
        </div>

        <div className="slds-col--padded">
          <label className="slds-form-element__label" htmlFor="layoutType">Layout Type</label>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select id="layoutType" className="slds-select">
                <option value="full">Full</option>
                <option value="compact">Compact</option>
              </select>
            </div>
          </div>
        </div>

        <div className="slds-col--padded">
          <label className="slds-form-element__label" htmlFor="formFactor">Form Factor</label>
          <div className="slds-form-element__control">
            <div className="slds-select_container">
              <select id="formFactor" className="slds-select" defaultValue="large">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        <div className="slds-col--padded" style={{"paddingRight": "0", "paddingTop": "1.5em", "maxWidth": "10em"}}>
          <button className="viewRecord slds-button slds-button--neutral slds-not-selected">View&nbsp;Record</button>
        </div>
      </div>
    </div>
  )
}

export default RecordSelector
