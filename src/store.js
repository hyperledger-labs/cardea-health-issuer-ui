import { createStore, combineReducers } from 'redux'

import loginReducer from './redux/loginReducer'
import contactsReducer from './redux/contactsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  login: loginReducer,
  contacts: contactsReducer,
})

export default createStore(rootReducer, composeWithDevTools())
