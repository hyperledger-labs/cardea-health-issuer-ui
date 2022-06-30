const initialState = {
  contact: {},
  contacts: [],
  contactSelected: '',
}

const SET_CONTACT = 'SET_CONTACT'
const SET_CONTACTS = 'SET_CONTACTS'
const SET_CONTACT_SELECTED = 'SET_CONTACT_SELECTED'

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
    type: SET_CONTACT,
    payload: contactSelected,
  }
}

export default function (state = initialState, action) {
  //Reducer contains a switch statement which takes in action.type, performs different functionality based on the action.type from the actions above.
  switch (action.type) {
    case SET_CONTACT:
      return { ...state, contact: action.payload }

    case SET_CONTACTS:
      return { ...state, contacts: action.payload }

    case SET_CONTACT_SELECTED:
      return { ...state, contactSelected: action.payload }

    default:
      return state
  }
}
