import { createStore, combineReducers } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

import contactsReducer from './redux/contactsReducer'
import credentialsReducer from './redux/credentialsReducer'
import governanceReducer from './redux/governanceReducer'
import loginReducer from './redux/loginReducer'
import notificationsReducer from './redux/notificationsReducer'
import presentationsReducer from './redux/presentationsReducer'
import settingsReducer from './redux/settingsReducer'
import usersReducer from './redux/usersReducer'

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

export default createStore(
  rootReducer
  // Comment out the following line when pushing to production
  // composeWithDevTools()
)
