import { combineReducers } from 'redux'

import login from './login'
import context from './context'
import header from './header'
import recentitems from './recentitems'
import record from './record'
import entities from './entities'
import rawjson from './rawjson'
import error from './error'
import picklists from './picklists.js'
import depGraph from './depGraph.js'

export default combineReducers( {
  login,
  context,
  header,
  recentitems,
  record,
  picklists,
  entities,
  rawjson,
  error,
  depGraph
})
