import { combineReducers } from 'redux'
import counter from './counter'
import global_reducer from './global_reducer'

export default combineReducers({
  counter,
  global_reducer
})
