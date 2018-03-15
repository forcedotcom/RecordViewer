import depGraphHelper from '../helpers/depGraphHelper'
const depGraph = (state = {pickListFields: undefined, modalFields: undefined, fieldTree: undefined}, action) => {
    switch (action.type) {
      case 'EDIT_DEP_GRAPH':
        return {
          picklistFields : depGraphHelper.getParentToChildPicklistValues(
            action.picklists, 
            action.modalFields, 
            action.editValues), 
          modalFields : action.modalFields, 
          fieldTree : action.fieldTree
        }
       case 'UPDATE_PICKLIST_FIELDS':
        return {
            ...state,
            picklistFields : new Map([...state.picklistFields, ...action.picklistFields])
        }
      default:
        return state
    }
  }
  
  export default depGraph