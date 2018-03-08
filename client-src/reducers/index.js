import { combineReducers } from 'redux'

import login from './login'
import context from './context'
import header from './header'
import recentitems from './recentitems'
import record from './record'
import picklists from './picklists'
import entities from './entities'
import rawjson from './rawjson'
import error from './error'

export default combineReducers( {
  login,
  context,
  header,
  recentitems,
  record,
  picklists,
  entities,
  rawjson,
  error
})
