import { takeEvery } from 'redux-saga'

import recentItemsFetcher from './recentItemsFetcher'
import recordFetcher from './recordFetcher'
import recordDeleter from './recordDeleter'
import recordUpdater from './recordUpdater'
import entitiesFetcher from './entitiesFetcher'
import recordCreator from './recordCreator'
import cloneDefaultsFetcher from './cloneDefaultsFetcher'
import createDefaultsFetcher from './createDefaultsFetcher'
import picklistsFetcher from './picklistsFetcher'
import depGraphValueUpdater from './depGraphValueUpdater'

export default function* rootSaga() {
  yield takeEvery('FETCH_RECORD', recordFetcher)
  yield takeEvery('FETCH_RECENT_ITEMS', recentItemsFetcher)
  yield takeEvery('DELETE_RECORD', recordDeleter)
  yield takeEvery('SAVE_RECORD', recordUpdater)
  yield takeEvery('FETCH_ENTITIES', entitiesFetcher)
  yield takeEvery('CREATE_RECORD', recordCreator)
  yield takeEvery('FETCH_CREATE_DEFAULTS', createDefaultsFetcher);
  yield takeEvery('FETCH_CLONE_DEFAULTS', cloneDefaultsFetcher);
  yield takeEvery('FETCH_PICKLISTS', picklistsFetcher);
  yield takeEvery('UPDATE_DEP_GRAPH_FIELD_VALUE', depGraphValueUpdater)
}
