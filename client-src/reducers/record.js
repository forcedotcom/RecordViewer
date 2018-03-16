import recordLayout from '../helpers/recordLayout'

const record = (state = {record: undefined, mode: 'View', prevMode: undefined}, action) => {
  switch (action.type) {
    case 'RECEIVE_RECORD':
      return {
        record: recordLayout.getLayoutModel(action.recordId, action.record),
        mode: 'View'
      }
    case 'RECEIVE_CREATE_DEFAULTS':
      return {
        record: recordLayout.getLayoutModelForDefaults(action.defaults),
        mode: 'Create'
      }
    case 'RECEIVE_CLONE_DEFAULTS':
      return {
        record: recordLayout.getLayoutModelForDefaults(action.defaults),
        mode: 'Clone'
      }
    case 'EDIT_RECORD':
      return {
        ...state,
        mode: 'Edit'
      }
    case 'EDIT_DEP_GRAPH':
      return {
        ...state,
        prevMode: action.prevMode, // save previous mode to return to on close
        mode: 'EditDepGraph'
      }
    case 'CLOSE_DEP_GRAPH':
      return {
        ...state,
        prevMode: undefined,
        mode: action.mode
      }
    case 'CLEAR_RECORD':
      return {
        record: undefined
      }
    case 'FINISHED_RECORD_DELETE':
      return {
        record: undefined
      }
    case 'UPDATE_FIELD_VALUE': {
      let oldEditValue = state.record.editValues[action.field];
      let newEditValue = {
        ...oldEditValue,
        current: action.value
      };

      var updateMap = {};
      updateMap[action.field] = newEditValue;

      let newEditValues = Object.assign({}, state.record.editValues, updateMap);

      return {
        ...state,
        record: {
          ...state.record,
          editValues: newEditValues}
      }
    }
    case 'RECORD_CREATE_SUCCESS': {
      // TODO: Update record in the UI instead of clearing back to home page.
      return {
        record: undefined
      }
    }

    case 'RECORD_UPDATE_SUCCESS': {
      // TODO: Update record in the UI instead of clearing back to home page.
      return {
        record: undefined
      }
    }
    default:
      return state
  }
}

export default record
