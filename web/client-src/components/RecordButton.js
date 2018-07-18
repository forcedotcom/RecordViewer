import React, { PropTypes } from 'react';

// Component that displays a button at the top of a record.
const RecordButton = ({onClick, label}) => {
  return (
    <div className="slds-button slds-button--neutral slds-not-selected" onClick={onClick}>
      <label style={{"cursor":"pointer"}}>{label}</label>
    </div>
  );
}

RecordButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default RecordButton
