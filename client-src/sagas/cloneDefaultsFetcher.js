import { call, put } from 'redux-saga/effects'

import { receiveCloneDefaults } from '../actions'

export default function* cloneDefaultsFetcher (action) {

  // TODO: Add dynamic FormFactor.
  let defaultsUrl = action.creds.instanceUrl + '/services/data/v42.0/ui-api/record-defaults/clone/' + action.id + '?formFactor=Large';

  let req = {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, defaultsUrl, req)
    const responseJson = yield response.json()
    yield put(receiveCloneDefaults(responseJson))
  } catch(err) {
    console.error('Clone defaults fetch error: ' + JSON.stringify(err))
  }
}
