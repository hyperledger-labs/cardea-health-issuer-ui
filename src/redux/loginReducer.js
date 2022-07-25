const initialState = {
  loggedInUserId: '',
  loggedInUserState: null,
  loggedInUsername: '',
  loggedInRoles: [],
  loggedIn: false,
}

const SET_LOGGED_IN = 'SET_LOGGED_IN'
const SET_LOGGED_IN_USER_STATE = 'SET_LOGGED_IN_USER_STATE'
const SET_LOGGED_IN_USER_ID = 'SET_LOGGED_IN_USER_ID'
const SET_LOGGED_IN_USERNAME = 'SET_LOGGED_IN_USERNAME'
const SET_LOGGED_IN_ROLES = 'SET_LOGGED_IN_ROLES'
const LOGOUT_USER = 'LOGOUT_USER'

export function setLoggedIn(input) {
  return {
    type: SET_LOGGED_IN,
    payload: input,
  }
}

export function setLoggedInUserId(id) {
  return {
    type: SET_LOGGED_IN_USER_ID,
    payload: id,
  }
}
export function setLoggedInUsername(username) {
  return {
    type: SET_LOGGED_IN_USERNAME,
    payload: username,
  }
}
export function setLoggedInRoles(roles) {
  return {
    type: SET_LOGGED_IN_ROLES,
    payload: roles,
  }
}
export function setLoggedInUserState(userCookie) {
  return {
    type: SET_LOGGED_IN_USER_STATE,
    payload: userCookie,
  }
}
export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, loggedIn: action.payload }

    case SET_LOGGED_IN_USER_ID:
      return { ...state, loggedInUserId: action.payload }

    case SET_LOGGED_IN_USERNAME:
      return { ...state, loggedInUsername: action.payload }

    case SET_LOGGED_IN_ROLES:
      return { ...state, loggedInRoles: action.payload }

    case SET_LOGGED_IN_USER_STATE:
      return { ...state, loggedInUserState: action.payload }

    case LOGOUT_USER:
      return initialState

    default:
      return state
  }
}
