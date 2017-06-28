import React, { PropTypes } from 'react';

// Component that displays a general error for the page.
const PageError = ({error}) => {
  return (
    <div className="slds-grid slds-m-around--small">
      <article className="slds-card slds-card--narrow slds-p-around--small">
        <div className="slds-card__body">
          <div className="slds-text-heading--small">{error.errorCode}</div>
          <div>{error.message}</div>
        </div>
      </article>
    </div>
  );
}

PageError.propTypes = {
  error: PropTypes.object.isRequired
}

export default PageError
