const initialState = {
  logo: null,
  theme: [],
  schemas: [],
  organizationName: [],
  smtp: [],
}

const SET_LOGO = 'SET_LOGO'
// const SET_USERS = 'SET_USERS'

export function setLogo(logo) {
  return {
    type: SET_LOGO,
    payload: logo,
  }
}

// export function setUsers(users) {
//   return {
//     type: SET_USERS,
//     payload: users,
//   }
// }

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGO:
      return { ...state, logo: action.payload }

    // case SET_USERS:
    //   return { ...state, users: action.payload }

    default:
      return state
  }
}
