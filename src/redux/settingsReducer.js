// (eldersonar) commented out code is attempt to put the logic of getting the logo inside the Redux action. It failed. We most likely need to implement Redux middlewares to achieve this goal... Requires more time and research
// import Axios from 'axios'
// import { handleImageSrc } from '../UI/util'
// import {
//   useNotification,
//   NotificationProvider,
// } from './UI/NotificationProvider'

const defaultTheme = {
  primary_color: '#0065B3',
  secondary_color: '#00AEEF',
  neutral_color: '#091C40',
  negative_color: '#ed003c',
  warning_color: '#e49b13',
  positive_color: '#008a00',
  text_color: '#555',
  text_light: '#fff',
  border: '#e3e3e3',
  drop_shadow: '3px 3px 3px rgba(0, 0, 0, 0.3)',
  background_primary: '#fff',
  background_secondary: '#f5f5f5',
}

// Check for local state copy of theme, otherwise use default hard coded here in App.js
const localTheme = JSON.parse(localStorage.getItem('recentTheme'))
const initialState = {
  logo: null,
  theme: localTheme ? localTheme : defaultTheme,
  schemas: {},
  organizationName: null,
  siteTitle: null,
  smtp: null,
}

const SET_LOGO = 'SET_LOGO'
// const GET_LOGO = 'GET_LOGO'
const SET_THEME = 'SET_THEME'
const SET_SCHEMAS = 'SET_SCHEMAS'
const SET_ORGANIZATION_NAME = 'SET_ORGANIZATION_NAME'
const SET_SITE_TITLE = 'SET_SITE_TITLE'
const SET_SMTP = 'SET_SMTP'
const CLEAR_SETTINGS_STATE = 'CLEAR_SETTINGS_STATE'

export function setLogo(logo) {
  return {
    type: SET_LOGO,
    payload: logo,
  }
}

// export async function getLogo() {
//   // let logo = null
//   const logo = await Axios({
//     method: 'GET',
//     url: '/api/logo',
//   })
//   if (logo.data.error) {
//     // setNotification(res.data.error, 'error')
//   } else {
//     return {
//       type: GET_LOGO,
//       payload: handleImageSrc(logo.data[0].image.data),
//     }
//   }
//   console.log(logo)
// }

export function setTheme(theme) {
  return {
    type: SET_THEME,
    payload: theme,
  }
}

export function setSchemas(schemas) {
  return {
    type: SET_SCHEMAS,
    payload: schemas,
  }
}

export function setOrganizationName(organizationName) {
  return {
    type: SET_ORGANIZATION_NAME,
    payload: organizationName,
  }
}

export function setSiteTitle(siteTitle) {
  return {
    type: SET_SITE_TITLE,
    payload: siteTitle,
  }
}

export function setSmtp(smtp) {
  return {
    type: SET_SMTP,
    payload: smtp,
  }
}

export function clearSettingsState() {
  return {
    type: CLEAR_SETTINGS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGO:
      return { ...state, logo: action.payload }

    // case GET_LOGO:
    //   return { ...state, logo: action.payload }

    case SET_THEME:
      return { ...state, theme: action.payload }

    case SET_SCHEMAS:
      return { ...state, schemas: action.payload }

    case SET_ORGANIZATION_NAME:
      return { ...state, organizationName: action.payload }

    case SET_SITE_TITLE:
      return { ...state, siteTitle: action.payload }

    case SET_SMTP:
      return { ...state, smtp: action.payload }

    case CLEAR_SETTINGS_STATE:
      return initialState

    default:
      return state
  }
}
