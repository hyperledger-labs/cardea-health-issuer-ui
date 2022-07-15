const initialState = {
  user: {},
  users: [],
  roles: [],
}

const SET_USER = 'SET_USER'
const SET_USERS = 'SET_USERS'
const SET_ROLES = 'SET_ROLES'
const CLEAR_USERS_STATE = 'CLEAR_USERS_STATE'

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  }
}

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users,
  }
}

export function setRoles(roles) {
  return {
    type: SET_ROLES,
    payload: roles,
  }
}

export function clearUsersState() {
  return {
    type: CLEAR_USERS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }

    case SET_USERS:
      return { ...state, users: action.payload }

    case SET_ROLES:
      return { ...state, roles: action.payload }

    case CLEAR_USERS_STATE:
      return initialState

    default:
      return state
  }
}
