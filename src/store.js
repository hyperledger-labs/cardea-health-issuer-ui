import { createStore, combineReducers } from 'redux'

import loginReducer from './redux/loginReducer'
import contactReducer from './redux/contactReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  login: loginReducer,
  contactsState: contactReducer,
})

export default createStore(rootReducer, composeWithDevTools())
