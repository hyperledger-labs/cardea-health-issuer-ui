import { createStore, combineReducers } from 'redux'

import loginReducer from './redux/loginReducer'
import contactsReducer from './redux/contactsReducer'
import credentialsReducer from './redux/credentialsReducer'
import presentationsReducer from './redux/presentationsReducer'
import usersReducer from './redux/usersReducer'
import settingsReducer from './redux/settingsReducer'
import governanceReducer from './redux/governanceReducer'
import notificationsReducer from './redux/notificationsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  login: loginReducer,
  contacts: contactsReducer,
  credentials: credentialsReducer,
  presentations: presentationsReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  settings: settingsReducer,
  governance: governanceReducer,
})

export default createStore(rootReducer, composeWithDevTools())
