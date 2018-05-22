
import { call, put } from 'redux-saga/effects'

import { receiveRecord } from '../actions'

export default function* recordFetcher (action) {

  // TODO: Add LayoutType to the state so that we can change view based on them
  let recordViewUrl = action.creds.instanceUrl + '/services/data/v43.0/ui-api/record-ui/' + action.recordId + '?formFactor=' + action.context.formFactor + '&layoutTypes=Full&modes=View,Edit';
  
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
