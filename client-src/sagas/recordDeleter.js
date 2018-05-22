import { call, put } from 'redux-saga/effects'

import { finishedRecordDelete } from '../actions'

export default function* recordDeleter (action) {

  let recordUrl = action.creds.instanceUrl + '/services/data/v43.0/ui-api/records/' + action.recordId
  let req = {
    method: 'DELETE',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, recordUrl, req)
    if (response.ok) {
      yield put(finishedRecordDelete())
    } else {
      console.log('Unexpected record delete status: ' + response.status)
    }
  } catch(err) {
    console.error('Record delete error: ' + JSON.stringify(err))
  }
}
