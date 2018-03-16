const header = (state = {recordId: ''}, action) => {
  switch (action.type) {
    case 'UPDATE_HEADER_RECORD_ID':
      return {
        recordId: action.recordId
      }
    case 'RECEIVE_RECORD':
      return {
        recordId: action.recordId
      }
    case 'CLEAR_RECORD':
      return {
        recordId: ''
      }
    default:
      return state
  }
}

export default header
