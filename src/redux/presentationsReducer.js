const initialState = {
    presentationReport: {},
    presentationReports: [],
  }
  
  const SET_PRESENTATION = 'SET_PRESENTATION'
  const SET_PRESENTATIONS = 'SET_PRESENTATIONS'
  const CLEAR_PRESENTATIONS_STATE = 'CLEAR_PRESENTATIONS_STATE'
  
  export function setpresentationReport(presentationReport) {
    return {
      type: SET_PRESENTATION,
      payload: presentationReport,
    }
  }
  
  export function setPresentationReports(presentationReports) {
    return {
      type: SET_PRESENTATIONS,
      payload: presentationReports,
    }
  }
  
  export function clearPresentationsState() {
    return {
      type: CLEAR_PRESENTATIONS_STATE,
      payload: null,
    }
  }
  
  export default function (state = initialState, action) {
    //Reducer contains a switch statement which takes in action.type, performs different functionality based on the action.type from the actions above.
    switch (action.type) {
      case SET_PRESENTATION:
        return { ...state, presentationReport: action.payload }
  
      case SET_PRESENTATIONS:
        return { ...state, presentationReports: action.payload }
  
      case CLEAR_PRESENTATIONS_STATE:
        return initialState
  
      default:
        return state
    }
  }
  