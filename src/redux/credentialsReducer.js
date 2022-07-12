const initialState = {
    credential: {},
    credentials: [],
    // contactSelected: '',
  }
  
  const SET_CREDENTIAL = 'SET_CREDENTIAL'
  const SET_CREDENTIALS = 'SET_CREDENTIALS'
  // const SET_CREDENTIAL_SELECTED = 'SET_CREDENTIAL_SELECTED'
  
  export function setCredential(credential) {
    return {
      type: SET_CREDENTIAL,
      payload: credential,
    }
  }
  
  export function setCredentials(credentials) {
    return {
      type: SET_CREDENTIALS,
      payload: credentials,
    }
  }
  
  // export function setCredentialSelected(credentialSelected) {
  //   return {
  //     type: SET_CREDENTIAL,
  //     payload: credentialSelected,
  //   }
  // }
  
  export default function (state = initialState, action) {
    //Reducer contains a switch statement which takes in action.type, performs different functionality based on the action.type from the actions above.
    switch (action.type) {
      case SET_CREDENTIAL:
        return { ...state, credential: action.payload }
  
      case SET_CREDENTIALS:
        return { ...state, credentials: action.payload }
  
      // case SET_CREDENTIAL_SELECTED:
      //   return { ...state, credentialSelected: action.payload }
  
      default:
        return state
    }
  }
  