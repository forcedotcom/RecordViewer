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

export const receiveRecord = (recordId, record) => {
  return {
    type: 'RECEIVE_RECORD',
    recordId,
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

export const editRecord = (creds, apiName, recordType) => {
  return {
    type: 'EDIT_RECORD',
    creds,
    apiName,
    recordType
  }
}

export const updateFieldValue = (field, value) => {
  return {
    type: 'UPDATE_FIELD_VALUE',
    field,
    value
  }
}

export const updateDepGraphFieldValue = (field, value, editValues, picklists, modalFields, fieldTree) => {
  return {
    type: 'UPDATE_DEP_GRAPH_FIELD_VALUE',
    field,
    value,
    picklists,
    modalFields,
    editValues,
    fieldTree
  }
}

export const updatePicklistFields = (picklistFields) => {
  return {
    type: 'UPDATE_PICKLIST_FIELDS',
    picklistFields
  }
}

export const recordUpdateSuccess = (recordData) => {
  return {
    type: 'RECORD_UPDATE_SUCCESS',
    recordData
  }
}

export const fetchPicklists = (creds, apiName, recordType) => {
  return {
    type: 'FETCH_PICKLISTS',
    creds,
    apiName,
    recordType
  }
}

export const receivePicklists = (url, result) => {
  return {
    type: 'RECEIVE_PICKLISTS',
    url,
    result
  }
}

export const editDepGraph = (picklists, modalFields, editValues, fieldTree, prevMode) => {
  return {
    type: 'EDIT_DEP_GRAPH',
    picklists,
    modalFields,
    editValues,
    fieldTree,
    prevMode
  }
}

export const closeDepGraph = (mode) => {
  return {
    type: 'CLOSE_DEP_GRAPH',
    mode
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
