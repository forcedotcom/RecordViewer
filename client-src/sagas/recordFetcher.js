
import { call, put } from 'redux-saga/effects'

import { receiveRecord } from '../actions'

export default function* recordFetcher (action) {

  // TODO: Add FormFactor & LayoutType to the state so that we can change view based on them, instead of hardcoding only Large here.
  let recordViewUrl = action.creds.instanceUrl + '/services/data/v41.0/ui-api/record-ui/' + action.recordId + '?formFactor=Large&modes=View,Edit';
  let req = {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, recordViewUrl, req)
    const responseJson = yield response.json()
    yield put(receiveRecord(action.recordId, responseJson))
  } catch(err) {
    console.error('Record fetch error: ' + JSON.stringify(err))
  }
}
