import rules from './rbac-rules'
import store from '../store'

export const check = (actions) => {
  const currentState = store.getState()
  const user = currentState.login.loggedInUserState

  // Get user roles
  if (!user) {
    return false
  } else {
    let roles = user.roles

    // Handle multiple roles by casting roles into array
    roles = roles instanceof Array ? roles : [roles]

    let permissions = []

    // Combine roles, ignore duplicate roles
    for (let i = 0; i < Object.keys(roles).length; i++) {
      permissions = [...new Set([...permissions, ...rules[roles[i]]])]
    }

    if (!permissions) {
      return false
    }

    // Determine all the permissions required by the component
    if (permissions) {
      const actionsList = actions.split(', ')

      // Check if the user has all required permissions
      for (const action in actionsList) {
        if (permissions.includes(actionsList[action])) {
          return true
        }
      }
    }
    return false
  }
}

export const CanUser = (props) =>
  check(props.perform) ? props.yes() : props.no()

CanUser.defaultProps = {
  yes: () => null,
  no: () => null,
}
