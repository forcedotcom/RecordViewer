export const finishLogin = (accessToken, instanceUrl) => {
  return {
    type: 'FINISH_LOGIN',
    accessToken,
    instanceUrl
  }
}

export const fetchEntities = (creds) => {
  return {
    type: 'FETCH_ENTITIES',
    creds
  }
}

export const fetchRecentItems = (creds) => {
  return {
    type: 'FETCH_RECENT_ITEMS',
    creds
  }
}

export const receiveEntities = (entities) => {
  return {
    type: 'RECEIVE_ENTITIES',
    entities,
    receivedAt: Date.now()
  }
}

export const fetchCreateDefaults = (creds, apiName) => {
  return {
    type: 'FETCH_CREATE_DEFAULTS',
    creds,
    apiName
  }
}

export const fetchCloneDefaults = (creds, id) => {
  return {
    type: 'FETCH_CLONE_DEFAULTS',
    creds,
    id
  }
}

export const receiveCreateDefaults = (defaults) => {
  return {
    type: 'RECEIVE_CREATE_DEFAULTS',
    defaults
  }
}

export const receiveCloneDefaults = (defaults) => {
  return {
    type: 'RECEIVE_CLONE_DEFAULTS',
    defaults
  }
}

export const receiveRecentItems = (recentItems) => {
  return {
    type: 'RECEIVE_RECENT_ITEMS',
    recentItems,
    receivedAt: Date.now()
  }
}

export const fetchRecord = (creds, recordId) => {
  return {
    type: 'FETCH_RECORD',
    creds,
    recordId
  }
}

export const receiveRecord = (record) => {
  return {
    type: 'RECEIVE_RECORD',
    record,
    receivedAt: Date.now()
  }
}

export const clearRecord = () => {
  return {
    type: 'CLEAR_RECORD'
  }
}

export const deleteRecord = (creds, recordId) => {
  return {
    type: 'DELETE_RECORD',
    creds,
    recordId
  }
}

export const saveRecord = (creds, recordId, objectInfo, editValues) => {
  return {
    type: 'SAVE_RECORD',
    creds,
    recordId,
    objectInfo,
    editValues
  }
}

export const createRecord = (creds, apiName, objectInfo, editValues) => {
  return {
    type: 'CREATE_RECORD',
    creds,
    apiName,
    objectInfo,
    editValues
  }
}

export const recordCreateSuccess = (recordData) => {
  return {
    type: 'RECORD_CREATE_SUCCESS',
    recordData
  }
}

export const finishedRecordDelete = () => {
  return {
    type: 'FINISHED_RECORD_DELETE'
  }
}

export const editRecord = () => {
  return {
    type: 'EDIT_RECORD'
  }
}

export const updateFieldValue = (field, value) => {
  return {
    type: 'UPDATE_FIELD_VALUE',
    field,
    value
  }
}

export const recordUpdateSuccess = (recordData) => {
  return {
    type: 'RECORD_UPDATE_SUCCESS',
    recordData
  }
}

export const fetchPicklist = (creds, url) => {
  return {
    type: 'FETCH_PICKLIST',
    creds,
    url
  }
}

export const receivePicklist = (url, result) => {
  return {
    type: 'RECEIVE_PICKLIST',
    url,
    result
  }
}

export const showError = (response, responseJson) => {
  return {
    type: 'SHOW_ERROR',
    response,
    responseJson
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}
