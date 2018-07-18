const login = (state = {loggedIn: false}, action) => {
  switch (action.type) {
    case 'FINISH_LOGIN':
      return {
        accessToken: action.accessToken,
        instanceUrl: action.instanceUrl,
        loggedIn: true
      }
    default:
      return state
  }
}

export default login
