const error = (state = {errorType: 'NONE', responseJson: undefined, errorCode: undefined, message: undefined, errors: undefined, fieldErrors: undefined}, action) => {
  switch (action.type) {
    case 'SHOW_ERROR': {
      let response = action.response;
      if (response.status === 404) {
        return {errorType: 'NOT_FOUND' };
      } else if (response.status === 400) {
        let responseJson = action.responseJson;
        if (Array.isArray(responseJson)) {
          // General error.
          return {
            errorType: 'PAGE',
            errorCode: responseJson[0].errorCode,
            message: responseJson[0].message,
            errors: undefined,
            fieldErrors: undefined};
        } else {
          // Record error.
          return {
            errorType: 'RECORD',
            errorCode: undefined,
            message: responseJson.message,
            errors: responseJson.output.errors,
            fieldErrors: responseJson.output.fieldErrors};
        }
      } else {
        return {errorType: 'NONE', responseJson: undefined, errorCode: undefined, message: undefined, errors: undefined, fieldErrors: undefined};
      }
    }
    case 'CLEAR_ERROR':
      return {errorType: 'NONE', responseJson: undefined, errorCode: undefined, message: undefined, errors: undefined, fieldErrors: undefined};
    default:
      return {errorType: 'NONE', responseJson: undefined, errorCode: undefined, message: undefined, errors: undefined, fieldErrors: undefined};
  }
}

export default error
