import { call, put } from 'redux-saga/effects'

import { receiveCreateDefaults, showError } from '../actions'

export default function* createDefaultsFetcher (action) {

  let defaultsUrl = action.creds.instanceUrl + '/services/data/v43.0/ui-api/record-defaults/create/' + action.apiName + '?formFactor=' + action.context.formFactor;

  let req = {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, defaultsUrl, req)
    const responseJson = yield response.json()

    if (!response.ok) {
      yield put(showError(response, responseJson));
    } else {
      yield put(receiveCreateDefaults(responseJson));
    }

  } catch(err) {
    console.error('Create defaults fetch error: ' + JSON.stringify(err))
  }
}
