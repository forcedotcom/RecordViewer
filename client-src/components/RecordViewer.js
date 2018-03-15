import React, { PropTypes } from 'react'
import JSONPretty from 'react-json-pretty';
import Inspector from 'react-json-inspector';
import AsyncKickoff from '../containers/AsyncKickoff'
import CreateableEntitiesList from './CreateableEntitiesList'
import RecentItemList from './RecentItemList'
import Record from './Record'
import RecordButton from './RecordButton'
import NotFoundError from './errors/NotFoundError'
import PageError from './errors/PageError'
import RecordError from './errors/RecordError'

let getFooter = (screen, error, rawjson) => {

  let errorNode = null;
  if (error && error.errorType != 'NONE') {
    if (error.errorType == 'NOT_FOUND') {
      errorNode = <NotFoundError />;
    } else if (error.errorType == 'PAGE') {
      errorNode = <PageError error={error} />;
    } else if (error.errorType == 'RECORD') {
      errorNode = <RecordError error={error} />;
    }
  }

  if (errorNode) {
    return (
      <div className="slds-p-left--medium slds-p-top--small slds-p-botom--medium">
        { errorNode }
        <RecordButton key="showJsonButton" label='Show JSON' onClick={() => $(".raw").toggle()} />
        <div className="raw" style={{"display":"none"}}>
          <Inspector key="rawjson" data={rawjson} />
        </div>
      </div>
      );
  } else {
    return (
      <div className="slds-p-left--medium slds-p-top--small slds-p-botom--medium">
        <RecordButton key="showJsonButton" label='Show JSON' onClick={() => $(".raw").toggle()} />
        <div className="raw" style={{"display":"none"}}>
          <Inspector key="rawjson" data={rawjson} />
        </div>
      </div>
      );
  }
}

// Component that displays login / recent items / record screens.
const RecordViewer =  ({screen, updateEntities, updateItems, creds, error, record, recordId, rawjson, mode, picklists, depGraph, entities, recentItems, onNewRecordClick, onCloneClick, onRecordClick, onBackClick, onDeleteClick, onEditClick, onSaveClick, onSaveNewClick, onFieldValueUpdate, onDepGraphFieldValueUpdate, onFetchEntities, onFetchRecord, onFetchRecentItems, onEditDepGraph, onDepGraphClose, prevMode}) => {
  if (screen == 'RECORD') {
    let layoutMode;
    if (mode === 'EditDepGraph') {
      layoutMode = prevMode;
    } else if (mode === 'Clone') {
      layoutMode = 'Edit';
    } else {
      layoutMode = mode;
    }
    
    return (
      <div>
        <Record recordView={record}
              layoutMode={layoutMode}
              uiMode={mode}
              prevMode={prevMode}
              creds={creds}
              error={error}
              picklists={picklists}
              depGraph={depGraph}
              onBackClick={onBackClick}
              onCloneClick={onCloneClick}
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              onSaveClick={onSaveClick}
              onSaveNewClick={onSaveNewClick}
              onFieldValueUpdate={onFieldValueUpdate}
              onEditDepGraph={onEditDepGraph}
              onDepGraphFieldValueUpdate={onDepGraphFieldValueUpdate}
              onDepGraphClose={onDepGraphClose} />
        { getFooter(screen, error, rawjson) }
      </div>
    );
  } else if (screen == 'FETCH_RECORD') {
    return (
      <div>
        <AsyncKickoff
          creds={creds}
          doRequest={(credsIn) => onFetchRecord(credsIn, recordId)} />
        <div className="slds-spinner_container">
          <div className="slds-spinner slds-spinner--large" role="alert">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
          </div>
        </div>
        { getFooter(screen, error, rawjson) }
      </div>
      );
  } else if (screen == 'RECENT') {
    return (
      <div>
        {updateItems &&
          <AsyncKickoff
            creds={creds}
            doRequest={onFetchRecentItems} />
        }
        {updateEntities &&
          <AsyncKickoff
            creds={creds}
            doRequest={onFetchEntities} />
        }
        <RecentItemList
           creds={creds}
           recentItems={recentItems}
           onClick={onRecordClick} />
        <CreateableEntitiesList
          creds={creds}
          entities={entities}
          onChange={onNewRecordClick} />
        { getFooter(screen, error, rawjson) }
      </div>
    );
  }
}

RecordViewer.propTypes = {
  screen: PropTypes.string.isRequired,
  updateEntities: PropTypes.bool,
  updateItems: PropTypes.bool,
  creds: PropTypes.object,
  record: PropTypes.object,
  error: PropTypes.object,
  recordId: PropTypes.string,
  rawjson: PropTypes.any,
  mode: PropTypes.string,
  entities: PropTypes.object,
  recentItems: PropTypes.object,
  picklists: PropTypes.object,
  depGraph: PropTypes.object,
  onRecordClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onCloneClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onNewRecordClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onSaveNewClick: PropTypes.func.isRequired,
  onFetchEntities: PropTypes.func.isRequired,
  onFetchRecentItems: PropTypes.func.isRequired,
  onFieldValueUpdate: PropTypes.func.isRequired,
  onDepGraphFieldValueUpdate: PropTypes.func.isRequired,
  onDepGraphClose: PropTypes.func.isRequired,
  onFetchRecord: PropTypes.func.isRequired,
  onEditDepGraph: PropTypes.func.isRequired
}

export default RecordViewer
