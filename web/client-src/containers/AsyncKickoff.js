import React, { PropTypes } from 'react';

// Component that kicks off an asynchronous request on mount and renders nothing.
class AsyncKickoff extends React.Component {
  componentWillMount() {
    this.props.doRequest(this.props.creds)
  }

  render() {
    return null
  }
}

AsyncKickoff.propTypes = {
  creds: React.PropTypes.object.isRequired,
  doRequest: React.PropTypes.func.isRequired
}

export default AsyncKickoff
