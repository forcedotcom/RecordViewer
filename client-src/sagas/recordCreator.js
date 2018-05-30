import { call, put } from 'redux-saga/effects'

import { recordCreateSuccess, showError } from '../actions'

export default function* recordCreator (action) {

  let recordDataUrl = action.creds.instanceUrl + '/services/data/v43.0/ui-api/records/';

  var recordInput = {};
  recordInput.apiName = action.apiName;
  recordInput.fields = {};
  Object.keys(action.editValues).map((field) => {
    let inputValue = action.editValues[field].current;
    if (action.editValues[field].original == null && inputValue == '') {
      // React doesn't like nulls in <select>
      inputValue = null;
    }

    let dataType = action.objectInfo.fields[field].dataType;
    if (dataType == 'Boolean') {
      recordInput.fields[field] = (inputValue == 'true');
    } else if (dataType == 'Int') {
      recordInput.fields[field] = parseInt(inputValue);
    } else if (dataType == 'Currency' || dataType == 'Double' || dataType == 'Percent') {
      recordInput.fields[field] = parseFloat(inputValue);
    } else {
      // By default use a string.
      recordInput.fields[field] = inputValue;
    }
  });

  console.log('RECORD INPUT: ' + JSON.stringify(recordInput));

  let req = {
    method: 'POST',
    body: JSON.stringify(recordInput),
    headers: {
      'Authorization' : 'Bearer ' + action.creds.accessToken,
      'Content-Type': 'application/json',
      'X-Chatter-Entity-Encoding': false}
  };

  try {
    const response = yield call(fetch, recordDataUrl, req)
    const responseJson = yield response.json()
    if (!response.ok) {
      yield put(showError(response, responseJson));
    } else {
      yield put(recordCreateSuccess(responseJson));
    }
  } catch(err) {
    console.error('Record create network error: ' + JSON.stringify(err))
  }
}
