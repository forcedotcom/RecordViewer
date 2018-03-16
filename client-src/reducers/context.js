const context = (state = {formFactor: 'Large'}, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_FACTOR':
      return {
        formFactor: action.formFactor
      }
    default:
      return state
  }
}

export default context
