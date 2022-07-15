const initialState = {
    selectedGovernance: null,
  }
  
  const SET_SELECTED_GOVERNANCE = 'SET_SELECTED_GOVERNANCE'
  const CLEAR_GOVERNANCE_STATE = 'CLEAR_GOVERNANCE_STATE'

  export function setSelectedGovernance(selectedGovernance) {
    return {
      type: SET_SELECTED_GOVERNANCE,
      payload: selectedGovernance,
    }
  }

  export function clearGovernancetate() {
    return {
      type: CLEAR_GOVERNANCE_STATE,
      payload: null,
    }
  }
  
  export default function (state = initialState, action) {

    switch (action.type) {
      case SET_SELECTED_GOVERNANCE:
        return { ...state, selectedGovernance: action.payload }

      case CLEAR_GOVERNANCE_STATE:
        return initialState
  
      default:
        return state
    }
  }
  