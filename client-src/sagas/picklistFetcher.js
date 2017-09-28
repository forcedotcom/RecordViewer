import { call, put } from 'redux-saga/effects'

import { receivePicklist } from '../actions'

export default function* picklistFetcher (action) {
  let picklistValuesUrl = action.creds.instanceUrl + action.url;

  let req = {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, picklistValuesUrl, req)
    const responseJson = yield response.json()
    yield put(receivePicklist(action.url, responseJson))
  } catch(err) {
    console.error('Picklist fetch error: ' + err + ' error keys: ' + Object.keys(err));
  }
}
