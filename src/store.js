import { createStore, combineReducers } from 'redux'

import loginReducer from './redux/loginReducer'
import contactsReducer from './redux/contactsReducer'
import usersReducer from './redux/usersReducer'
import settingsReducer from './redux/settingsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  login: loginReducer,
  contacts: contactsReducer,
  users: usersReducer,
  settings: settingsReducer,
})

export default createStore(rootReducer, composeWithDevTools())
