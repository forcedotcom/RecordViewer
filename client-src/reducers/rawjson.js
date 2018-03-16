const rawjson = (state = null, action) => {
  switch (action.type) {
    case 'RECEIVE_RECORD':
      return action.record;
    case 'RECORD_CREATE_SUCCESS':
      return action.recordData;
    case 'RECORD_UPDATE_SUCCESS':
      return action.recordData;
    case 'RECEIVE_CLONE_DEFAULTS':
      return action.defaults;
    case 'RECEIVE_CREATE_DEFAULTS':
      return action.defaults;
    case 'RECEIVE_PICKLISTS':
      return action.result;
    default:
      return null;
  }
}

export default rawjson
