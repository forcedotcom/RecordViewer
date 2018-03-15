import { combineReducers } from 'redux'

import login from './login'
import recentitems from './recentitems'
import record from './record'
import entities from './entities'
import rawjson from './rawjson'
import error from './error'
import picklists from './picklists.js'
import depGraph from './depGraph.js'

export default combineReducers( {
  login,
  recentitems,
  record,
  picklists,
  entities,
  rawjson,
  error,
  depGraph
})
