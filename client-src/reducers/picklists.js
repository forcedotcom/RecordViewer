const picklists = (state = {values: undefined}, action) => {
  switch (action.type) {
    case 'RECEIVE_PICKLISTS':
      return {
        fieldValues : action.result.picklistFieldValues
      }
    case 'FETCH_PICKLISTS': // clear when new collection is requested
      return {
        fieldValues: undefined
      }
    default:
      return state
  }
}

export default picklists