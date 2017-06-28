const picklists = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_PICKLIST':
      return {
        ...state,
        [action.url]: action.result
      }
    default:
      return state
  }
}

export default picklists
