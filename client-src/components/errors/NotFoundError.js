import React from 'react';

// Component that displays a resource not found error.
const NotFoundError = () => {
  return (
    <article className="slds-card slds-card--narrow slds-p-around--small">
      <div>Unable to contact the server. This could be caused by the following reasons:</div>
      <ul style="list-style: initial; margin-top: 1em;">
        <li style="margin-left: 3em;">The server from the target URL is not accessible.</li>
        <li style="margin-left: 3em;">The organization doesn't have CORS enabled. See the <a href="https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/extend_code_cors.htm" target="_blank">docs</a> on how to setup CORS.</li>
      </ul>
    </article>
  );
}

export default NotFoundError


