import React, { PropTypes } from 'react';

// Component that displays errors pertaining to a specific record, possibly including
// field-level issues.
const RecordError = ({error}) => {
  return (
    <div className="slds-grid slds-m-around--small">
      <article className="slds-card slds-card--narrow slds-p-around--small">
        <div className="slds-card__body">
          <div>{error.message}</div>
          {error.errors.map((pageError) =>
            <div>{pageError.message}</div>
          )}
        </div>
      </article>
    </div>
  );
}

RecordError.propTypes = {
  error: PropTypes.object.isRequired
}

export default RecordError
