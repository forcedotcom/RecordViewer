import { call, put } from 'redux-saga/effects'

import { receiveRecentItems } from '../actions'

export default function* recentItemsFetcher(action) {

  let mruUrl = action.creds.instanceUrl + '/services/data/v43.0/recent'

  let req = {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken}
    }

  try {
    const response = yield call(fetch, mruUrl, req)
    const responseJson = yield response.json()
    yield put(receiveRecentItems(responseJson))
  } catch(err) {
    console.error('MRU fetch error: ' + JSON.stringify(err))
  }
}
