const initialState = {
  contact: {},
  // contactId: '',
  contacts: [],
}

const SET_CONTACT = 'SET_CONTACT'
// const SET_CONTACT_ID = 'SET_CONTACT_ID'
const SET_CONTACTS = 'SET_CONTACTS'

export function setContact(contact) {
  return {
    type: SET_CONTACT,
    payload: contact,
  }
}

// export function setContactId(input) {
//   return {
//     type: SET_CONTACT_ID,
//     payload: input,
//   }
// }

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  }
}

// export function setContacts(prevContacts, data) {
//   let newContacts = data.contacts
//   let oldContacts = prevContacts
//   let updContacts = []

//   // (mikekebert) Loop through the new contacts and check them against the existing array
//   newContacts.forEach((newContact) => {
//     oldContacts.forEach((oldContact, index) => {
//       if (
//         oldContact !== null &&
//         newContact !== null &&
//         oldContact.contact_id === newContact.contact_id
//       ) {
//         // (mikekebert) If you find a match, delete the old copy from the old array
//         oldContacts.splice(index, 1)
//       }
//     })
//     updContacts.push(newContact)
//   })

//   if (oldContacts.length > 0) {
//     // (mikekebert) Sort the array by data created, newest on top
//     updContacts.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
//     updContacts = [...updContacts, ...oldContacts]
//   }

//   setContact(data.contacts[0])

//   return {
//     type: SET_CONTACTS,
//     payload: updContacts,
//   }
// }

export default function (state = initialState, action) {
  //Reducer contains a switch statement which takes in action.type, performs different functionality based on the action.type from the actions above.
  switch (action.type) {
    case SET_CONTACT:
      return { ...state, contact: action.payload }

    // case SET_CONTACT_ID:
    //   return { ...state, contactId: action.payload }

    case SET_CONTACTS:
      return { ...state, contacts: action.payload }

    default:
      return state
  }
}
