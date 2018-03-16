import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import RecordViewer from '../components/RecordViewer';

// Presentational Component that uses state to decide how to
// construct the RecordViewer.
const mapStateToProps = (state) => {
  if (state.record.record) {
    return {
      screen: 'RECORD',
      record: state.record.record,
      headerRecordId: state.header.recordId,
      mode: state.record.mode,
      context: state.context,
      prevMode: state.record.prevMode,
      creds: state.login,
      picklists : state.picklists,
      depGraph: state.depGraph,
      rawjson: state.rawjson,
      error: state.error
    }
  } else if (state.record.recordId) {
    return {
      screen: 'FETCH_RECORD',
      recordId: state.record.recordId,
      mode: 'View',
      context: state.context,
      creds: state.login,
      rawjson: state.rawjson,
      error: state.error
    }
  } else {
    // TODO: Do these based on last fetch time instead.
    let updateItems = ('recentItems' in state.recentitems) ? state.recentitems.recentItems.length == 0 : false;
    let updateEntities = ('sobjects' in state.entities) ? state.entities.sobjects.length == 0 : false;

    return {
      screen: 'RECENT',
      context: state.context,
      updateItems: updateItems,
      updateEntities: updateEntities,
      entities: state.entities,
      recentItems: state.recentitems,
      creds: state.login,
      rawjson: state.rawjson,
      error: state.error
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchRecord: (creds, id, context) => {
      dispatch(actions.fetchRecord(creds, id, context))
    },
    onRecordClick: (creds, id, context) => {
      dispatch(actions.fetchRecord(creds, id, context))
    },
    onViewRecordClick: (creds, id, context) => {
      dispatch(actions.fetchRecord(creds, id, context))
    },
    onFormFactorSelect: (formFactor, recordId) => {
      dispatch(actions.updateFormFactor(formFactor, recordId))
    },
    onRecordIdUpdate: (recordId) => {
      dispatch(actions.updateHeaderRecordId(recordId))
    },
    onNewRecordClick: (creds, apiName, context) => {
      dispatch(actions.fetchCreateDefaults(creds, apiName, context))
      // hacky: default record type for now
      dispatch(actions.fetchPicklists(creds, apiName, '012000000000000AAA'))
    },
    onCloneClick: (creds, id, apiName, recordType, context) => {
      dispatch(actions.fetchCloneDefaults(creds, id, context))
      dispatch(actions.fetchPicklists(creds, apiName, recordType))
    },
    onDeleteClick: (creds, id) => {
      dispatch(actions.deleteRecord(creds, id))
    },
    onEditClick: (creds, apiName, recordType) => {
      dispatch(actions.editRecord(creds, apiName, recordType))
      dispatch(actions.fetchPicklists(creds, apiName, recordType))
    },
    onSaveClick: (creds, id, objectInfo, editValues) => {
      dispatch(actions.saveRecord(creds, id, objectInfo, editValues))
    },
    onSaveNewClick: (creds, apiName, objectInfo, editValues) => {
      dispatch(actions.createRecord(creds, apiName, objectInfo, editValues))
    },
    onFetchEntities: (creds) => {
      dispatch(actions.fetchEntities(creds))
    },
    onFetchRecentItems: (creds) => {
      dispatch(actions.fetchRecentItems(creds))
    },
    onBackClick: () => {
      dispatch(actions.clearRecord())
    },
    onFieldValueUpdate: (field, value) => {
      dispatch(actions.updateFieldValue(field, value))
    },
    onEditDepGraph: (picklists, modalFields, editValues, fieldTree, prevMode) => {
      dispatch(actions.editDepGraph(picklists, modalFields, editValues, fieldTree, prevMode));
    },
    onDepGraphFieldValueUpdate: (field, value, picklists, modalFields, rootField, fieldTree) => {
      dispatch(actions.updateDepGraphFieldValue(field, value, picklists, modalFields, rootField, fieldTree))
    },
    onDepGraphClose: (mode) => {
      dispatch(actions.closeDepGraph(mode))
    }
  }
}

const RecordViewerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
) (RecordViewer)

export default RecordViewerWrapper
