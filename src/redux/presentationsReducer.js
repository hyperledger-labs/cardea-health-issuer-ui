const initialState = {
    presentationReport: {},
    presentationReports: [],
    // presentationSelected: '',
  }
  
  const SET_PRESENTATION = 'SET_PRESENTATION'
  const SET_PRESENTATIONS = 'SET_PRESENTATIONS'
  // const SET_PRESENTATION_SELECTED = 'SET_PRESENTATION_SELECTED'
  
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
  
  // export function setPresentationSelected(presentationSelected) {
  //   return {
  //     type: SET_PRESENTATION,
  //     payload: presentationSelected,
  //   }
  // }
  
  export default function (state = initialState, action) {
    //Reducer contains a switch statement which takes in action.type, performs different functionality based on the action.type from the actions above.
    switch (action.type) {
      case SET_PRESENTATION:
        return { ...state, presentationReport: action.payload }
  
      case SET_PRESENTATIONS:
        return { ...state, presentationReports: action.payload }
  
      // case SET_PRESENTATION_SELECTED:
      //   return { ...state, presentationSelected: action.payload }
  
      default:
        return state
    }
  }
  