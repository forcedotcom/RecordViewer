const entities = (state = {sobjects: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_ENTITIES':
      return {
        sobjects: action.entities.objects,
        receivedAt: action.receivedAt
      }
    default:
      return state
  }
}

export default entities
