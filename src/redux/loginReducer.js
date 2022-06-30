const initialState = {
  loggedInUserId: '',
  loggedInUserState: null,
  loggedInUsername: '',
  loggedInRoles: [],
  loggedIn: false,
  // logo: null,
}
// loggedInRoles
// loggedIn
//

const SET_LOGO = 'SET_LOGO'
const SET_LOGGED_IN = 'SET_LOGGED_IN'
const SET_LOGGED_IN_USER_STATE = 'SET_LOGGED_IN_USER_STATE'
const SET_LOGGED_IN_USER_ID = 'SET_LOGGED_IN_USER_ID'
const SET_LOGGED_IN_USERNAME = 'SET_LOGGED_IN_USERNAME'
const SET_LOGGED_IN_ROLES = 'SET_LOGGED_IN_ROLES'
const LOGOUT_USER = 'LOGOUT_USER'

// export function setLogo(logo) {
//   return {
//     type: SET_LOGO,
//     payload: logo,
//   }
// }

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

//Reducer-  default export and the boss of everything
//Takes in two parameters, state set as initialState, and action. setting state to initial state keeps the reducer from breaking. So if someone put something into settings that would break it it would send back initialState instead.
export default function (state = initialState, action) {
  //Reducer contains a switch statement which takes in action.type, performs different functionality based on the action.type from the actions above.
  switch (action.type) {
    //case action name from above followed by a colon
    // case SET_LOGO:
    //   //then return an object, to change state, in order to not erase untouched parts, spread in existing state. declare the part of state you want to touch and assign the payload to it.
    //   return { ...state, logo: action.payload }

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
