const initialState = {
    selectedGovernance: null,
    governanceOptions: [],
  }
  
  const SET_SELECTED_GOVERNANCE = 'SET_SELECTED_GOVERNANCE'
  const SET_GOVERNANCE_OPTIONS = 'SET_GOVERNANCE_OPTIONS'
  const CLEAR_GOVERNANCE_STATE = 'CLEAR_GOVERNANCE_STATE'

  export function setSelectedGovernance(selectedGovernance) {
    return {
      type: SET_SELECTED_GOVERNANCE,
      payload: selectedGovernance,
    }
  }

  export function setGovernanceOptions(governanceOptions) {
    return {
      type: SET_GOVERNANCE_OPTIONS,
      payload: governanceOptions,
    }
  }

  export function clearGovernanceState() {
    return {
      type: CLEAR_GOVERNANCE_STATE,
      payload: null,
    }
  }
  
  export default function (state = initialState, action) {

    switch (action.type) {
      case SET_SELECTED_GOVERNANCE:
        return { ...state, selectedGovernance: action.payload }

      case SET_GOVERNANCE_OPTIONS:
        return { ...state, governanceOptions: action.payload }

      case CLEAR_GOVERNANCE_STATE:
        return initialState
  
      default:
        return state
    }
  }
  