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

const localTheme = JSON.parse(localStorage.getItem('recentTheme'))
const initialState = {
  logo: null,
  theme: localTheme ? localTheme : defaultTheme,
  schemas: {},
  organizationName: [],
  smtp: [],
}

const SET_LOGO = 'SET_LOGO'
const SET_THEME = 'SET_THEME'
const SET_SCHEMAS = 'SET_SCHEMAS'
const SET_ORGANIZATION_NAME = 'SET_ORGANIZATION_NAME'
const SET_SMTP = 'SET_SMTP'

export function setLogo(logo) {
  return {
    type: SET_LOGO,
    payload: logo,
  }
}

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

export function setSmtp(smtp) {
  return {
    type: SET_SMTP,
    payload: smtp,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGO:
      return { ...state, logo: action.payload }

    case SET_THEME:
      return { ...state, theme: action.payload }

    case SET_SCHEMAS:
      return { ...state, schemas: action.payload }

    case SET_ORGANIZATION_NAME:
      return { ...state, organizationName: action.payload }

    case SET_SMTP:
      return { ...state, smtp: action.payload }

    default:
      return state
  }
}
