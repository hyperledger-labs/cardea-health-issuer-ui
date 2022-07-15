const initialState = {
  contact: {},
  contacts: [],
  contactSelected: '',
}

const SET_CONTACT = 'SET_CONTACT'
const SET_CONTACTS = 'SET_CONTACTS'
const SET_CONTACT_SELECTED = 'SET_CONTACT_SELECTED'
const CLEAR_CONTACTS_STATE = 'CLEAR_CONTACTS_STATE'

export function setContact(contact) {
  return {
    type: SET_CONTACT,
    payload: contact,
  }
}

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  }
}

export function setContactSelected(contactSelected) {
  return {
    type: SET_CONTACT_SELECTED,
    payload: contactSelected,
  }
}

export function clearContactstate() {
  return {
    type: CLEAR_CONTACTS_STATE,
    payload: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CONTACT:
      return { ...state, contact: action.payload }

    case SET_CONTACTS:
      return { ...state, contacts: action.payload }

    case SET_CONTACT_SELECTED:
      return { ...state, contactSelected: action.payload }

    case CLEAR_CONTACTS_STATE:
      return initialState

    default:
      return state
  }
}
