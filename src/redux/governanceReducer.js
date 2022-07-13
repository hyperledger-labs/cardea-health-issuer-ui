const initialState = {
    selectedGovernance: null,
  }
  
  const SET_SELECTED_GOVERNANCE = 'SET_SELECTED_GOVERNANCE'

  export function setSelectedGovernance(selectedGovernance) {
    return {
      type: SET_SELECTED_GOVERNANCE,
      payload: selectedGovernance,
    }
  }
  
  export default function (state = initialState, action) {

    switch (action.type) {
      case SET_SELECTED_GOVERNANCE:
        return { ...state, selectedGovernance: action.payload }
  
      default:
        return state
    }
  }
  