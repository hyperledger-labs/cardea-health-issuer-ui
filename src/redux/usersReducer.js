const initialState = {
  user: {},
  users: [],
}

const SET_USER = 'SET_USER'
const SET_USERS = 'SET_USERS'

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

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }

    case SET_USERS:
      return { ...state, users: action.payload }

    default:
      return state
  }
}
