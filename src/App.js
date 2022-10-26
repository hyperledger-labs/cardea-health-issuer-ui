import Axios from 'axios'

import Cookies from 'universal-cookie'
import React, { useState, useEffect, useRef, useMemo } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import AccountSetup from './UI/AccountSetup'
import AppHeader from './UI/AppHeader'
import AppFooter from './UI/AppFooter'

import { check, CanUser } from './UI/CanUser'
import rules from './UI/rbac-rules'

import Contact from './UI/Contact'
import Contacts from './UI/Contacts'
import Credential from './UI/Credential'
import Credentials from './UI/Credentials'
import ForgotPassword from './UI/ForgotPassword'
import FullPageSpinner from './UI/FullPageSpinner'
import Home from './UI/Home'
import Login from './UI/Login'
import {
  useNotification,
  NotificationProvider,
} from './UI/NotificationProvider'
import PasswordReset from './UI/PasswordReset'
import Presentations from './UI/Presentations'
import Presentation from './UI/Presentation'
import Settings from './UI/Settings'
import User from './UI/User'
import Users from './UI/Users'

import SessionProvider from './UI/SessionProvider'

import './App.css'

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /*display: grid;
  grid-template-columns: 240px 1fr;*/
`
const Main = styled.main`
  flex: 9;
  /*grid-row: 1;
  grid-column: 2;*/
  padding: 30px;
`

function App() {
  const defaultTheme = {
    primary_color: '#0065B3',
    secondary_color: '#00AEEF',
    neutral_color: '#091C40',
    negative_color: '#ed003c',
    warning_color: '#e49b13',
    positive_color: '#008a00',
    text_color: '#555',
    text_light: '#fff',
    border: '#e3e3e3',
    drop_shadow: '3px 3px 3px rgba(0, 0, 0, 0.3)',
    background_primary: '#fff',
    background_secondary: '#f5f5f5',
  }

  const cookies = new Cookies()

  // (AmmonBurgi) Keeps track of loading processes. The useMemo is necessary to preserve list across re-renders.
  const loadingList = useMemo(() => [], [])

  const setNotification = useNotification()

  // Websocket reference hook
  const controllerSocket = useRef()

  // Used for websocket auto reconnect
  const [websocket, setWebsocket] = useState(false)
  const [readyForMessages, setReadyForMessages] = useState(false)

  // Keep track of loading processes
  const [loadingArray, setLoadingArray] = useState([])

  // State governs whether the app should be loaded. Depends on the loadingArray
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  // Check for local state copy of theme, otherwise use default hard coded here in App.js
  const localTheme = JSON.parse(localStorage.getItem('recentTheme'))
  const [theme, setTheme] = useState(localTheme ? localTheme : defaultTheme)
  const [schemas, setSchemas] = useState({})
  const [siteTitle, setSiteTitle] = useState('')

  // Styles to change array
  const [stylesArray, setStylesArray] = useState([])

  // Message states
  const [contacts, setContacts] = useState([])
  const [contact, setContact] = useState({})
  const [credentials, setCredentials] = useState([])
  const [presentationReports, setPresentationReports] = useState([])
  const [image, setImage] = useState()
  const [roles, setRoles] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [organizationName, setOrganizationName] = useState(null)
  const [smtp, setSmtp] = useState(null)

  // Session states
  const [session, setSession] = useState('')
  const [loggedInUserId, setLoggedInUserId] = useState('')
  const [loggedInUserState, setLoggedInUserState] = useState(null)
  const [loggedInUsername, setLoggedInUsername] = useState('')
  const [loggedInRoles, setLoggedInRoles] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessionTimer, setSessionTimer] = useState(60)

  const [QRCodeURL, setQRCodeURL] = useState('')
  const [focusedConnectionID, setFocusedConnectionID] = useState('')

  // Governance state
  const [privileges, setPrivileges] = useState([])
  const [governanceOptions, setGovernanceOptions] = useState([])
  const [selectedGovernance, setSelectedGovernance] = useState('')

  // (JamesKEbert) Note: We may want to abstract the websockets out into a high-order component for better abstraction, especially potentially with authentication/authorization

  // Perform First Time Setup. Connect to Controller Server via Websockets

  // TODO: Setting logged-in user and session states on app mount
  useEffect(() => {
    Axios({
      method: 'GET',
      url: '/api/renew-session',
    })
      .then((res) => {
        if (cookies.get('sessionId')) {
          // Update session expiration date
          setSession(cookies.get('sessionId'))
          setLoggedIn(true)

          setLoggedInUserState(res.data)
          setLoggedInUserId(res.data.id)
          setLoggedInUsername(res.data.username)
          setLoggedInRoles(res.data.roles)
        } else setAppIsLoaded(true)
      })
      .catch((error) => {
        // Unauthorized
        setAppIsLoaded(true)
      })
  }, [loggedIn])

  // Setting up websocket and controllerSocket
  useEffect(() => {
    if (session && loggedIn) {
      let url = new URL('/api/ws', window.location.href)
      url.protocol = url.protocol.replace('http', 'ws')
      controllerSocket.current = new WebSocket(url.href)

      controllerSocket.current.onopen = () => {
        setWebsocket(true)
      }

      controllerSocket.current.onclose = (event) => {
        // Auto Reopen websocket connection
        // (JamesKEbert) TODO: Converse on sessions, session timeout and associated UI

        setReadyForMessages(false)
        setLoggedIn(false)
        setWebsocket(false)
      }

      // Error Handler
      controllerSocket.current.onerror = (event) => {
        setNotification('Client Error - Websockets', 'error')
      }

      // Receive new message from Controller Server
      controllerSocket.current.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data)

        messageHandler(
          parsedMessage.context,
          parsedMessage.type,
          parsedMessage.data
        )
      }
    }
  }, [loggedIn, session])

  // (eldersonar) Set-up site title. What about SEO? Will robots be able to read it?
  useEffect(() => {
    document.title = siteTitle
  }, [siteTitle])

  useEffect(() => {
    // Perform operation on websocket open
    // Run web sockets only if authenticated
    if (
      session &&
      loggedIn &&
      websocket &&
      readyForMessages &&
      loggedInUserState &&
      loadingList.length === 0
    ) {
      sendMessage('SETTINGS', 'GET_THEME', {})
      addLoadingProcess('THEME')
      sendMessage('SETTINGS', 'GET_SCHEMAS', {})
      addLoadingProcess('SCHEMAS')
      // sendMessage('GOVERNANCE', 'GET_PRIVILEGES', {})
      // addLoadingProcess('GOVERNANCE')

      sendMessage('GOVERNANCE', 'GET_ALL', {})
      addLoadingProcess('ALL_GOVERNANCE')

      sendMessage('SETTINGS', 'GET_SELECTED_GOVERNANCE', {})
      addLoadingProcess('SELECTED_GOVERNANCE')

      if (
        check(rules, loggedInUserState, 'contacts:read', 'demographics:read')
      ) {
        sendMessage('CONTACTS', 'GET_ALL', {
          additional_tables: ['Demographic'],
        })
        addLoadingProcess('CONTACTS')
      }

      if (check(rules, loggedInUserState, 'credentials:read')) {
        sendMessage('CREDENTIALS', 'GET_ALL', {})
        addLoadingProcess('CREDENTIALS')
      }

      if (check(rules, loggedInUserState, 'roles:read')) {
        sendMessage('ROLES', 'GET_ALL', {})
        addLoadingProcess('ROLES')
      }

      if (check(rules, loggedInUserState, 'presentations:read')) {
        sendMessage('PRESENTATIONS', 'GET_ALL', {})
        addLoadingProcess('PRESENTATIONS')
      }

      sendMessage('SETTINGS', 'GET_ORGANIZATION', {})
      addLoadingProcess('ORGANIZATION')

      if (check(rules, loggedInUserState, 'settings:update')) {
        sendMessage('SETTINGS', 'GET_SMTP', {})
        addLoadingProcess('SMTP')
      }

      sendMessage('IMAGES', 'GET_ALL', {})
      addLoadingProcess('LOGO')

      if (check(rules, loggedInUserState, 'users:read')) {
        sendMessage('USERS', 'GET_ALL', {})
        addLoadingProcess('USERS')
      }
    }
  }, [session, loggedIn, websocket, readyForMessages, loggedInUserState])

  // (eldersonar) Shut down the websocket
  function closeWSConnection(code, reason) {
    controllerSocket.current.close(code, reason)
  }

  // Send a message to the Controller server
  function sendMessage(context, type, data = {}) {
    if (controllerSocket.current.readyState === 1) {
      controllerSocket.current.send(JSON.stringify({ context, type, data }))
    }
  }

  // Handle inbound messages
  const messageHandler = async (context, type, data = {}) => {
    try {
      console.log(
        `New Message with context: '${context}' and type: '${type}' with data:`,
        data
      )
      switch (context) {
        case 'ERROR':
          switch (type) {
            case 'SERVER_ERROR':
              setNotification(
                `Server Error - ${data.errorCode} \n Reason: '${data.errorReason}'`,
                'error'
              )
              break

            case 'WEBSOCKET_ERROR':
              clearLoadingProcess()
              setErrorMessage(data.error)
              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'INVITATIONS':
          switch (type) {
            case 'INVITATION':
              setQRCodeURL(data.invitation_record.invitation_url)
              break

            case 'SINGLE_USE_USED':
              if (data.workflow === 'test_id') {
                // (mikekebert) Reset the QR code URL (which also closes the QR code modal)
                setQRCodeURL('')
                // (mikekebert) Set the connection_id so we can issue a credential to a particular connection
                setFocusedConnectionID(data.connection_id)
              } else {
                // (mikekebert) Reset the QR code URL (which also closes the QR code modal)
                setQRCodeURL('')
              }
              break

            case 'INVITATIONS_ERROR':
              // console.log(data.error)
              // console.log('Invitations Error')
              setErrorMessage(data.error)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'CONTACTS':
          switch (type) {
            case 'CONTACTS':
              setContacts((prevContacts) => {
                let newContacts = data.contacts
                let oldContacts = prevContacts
                let updContacts = []

                // (mikekebert) Loop through the new contacts and check them against the existing array
                newContacts.forEach((newContact) => {
                  oldContacts.forEach((oldContact, index) => {
                    if (
                      oldContact !== null &&
                      newContact !== null &&
                      oldContact.contact_id === newContact.contact_id
                    ) {
                      // (mikekebert) If you find a match, delete the old copy from the old array
                      oldContacts.splice(index, 1)
                    }
                  })
                  updContacts.push(newContact)
                })

                if (oldContacts.length > 0) {
                  updContacts = [...oldContacts, ...updContacts]
                  // (mikekebert) Sort the array by data created, newest on top
                }
                updContacts.sort((a, b) =>
                  a.created_at < b.created_at ? 1 : -1
                )

                setContact(data.contacts[0])
                return updContacts
              })
              removeLoadingProcess('CONTACTS')
              break

            case 'CONTACTS_ERROR':
              // console.log(data.error)
              // console.log('Contacts Error')
              setErrorMessage(data.error)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'DEMOGRAPHICS':
          switch (type) {
            case 'DEMOGRAPHICS_ERROR':
              // console.log(data.error)
              // console.log('Demographics Error')
              setErrorMessage(data.error)

              break

            case 'CONTACTS_ERROR':
              // console.log(data.error)
              // console.log('CONTACTS ERROR')
              setErrorMessage(data.error)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'DEMOGRAPHICS':
          switch (type) {
            case 'DEMOGRAPHICS_ERROR':
              console.log(data.error)
              console.log('DEMOGRAPHICS ERROR')
              setErrorMessage(data.error)

              break

            case 'CONTACTS_ERROR':
              console.log(data.error)
              console.log('CONTACTS ERROR')
              setErrorMessage(data.error)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'DEMOGRAPHICS':
          switch (type) {
            case 'DEMOGRAPHICS_ERROR':
              console.log(data.error)
              console.log('DEMOGRAPHICS ERROR')
              setErrorMessage(data.error)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'OUT_OF_BAND':
          switch (type) {
            case 'INVITATION':
              setQRCodeURL(data.invitation_record)

              break

            case 'INVITATIONS_ERROR':
              console.log(data.error)
              console.log('Invitations Error')
              setErrorMessage(data.error)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'ROLES':
          switch (type) {
            case 'ROLES':
              setRoles((prevRoles) => {
                let oldRoles = prevRoles
                let newRoles = data.roles
                let updatedRoles = []
                // (mikekebert) Loop through the new roles and check them against the existing array
                newRoles.forEach((newRole) => {
                  oldRoles.forEach((oldRole, index) => {
                    if (
                      oldRole !== null &&
                      newRole !== null &&
                      oldRole.role_id === newRole.role_id
                    ) {
                      // (mikekebert) If you find a match, delete the old copy from the old array
                      oldRoles.splice(index, 1)
                    }
                  })
                  updatedRoles.push(newRole)
                })
                // (mikekebert) When you reach the end of the list of new roles, simply add any remaining old roles to the new array
                if (oldRoles.length > 0)
                  updatedRoles = [...updatedRoles, ...oldRoles]

                return updatedRoles
              })
              removeLoadingProcess('ROLES')

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'USERS':
          switch (type) {
            case 'USERS':
              setUsers((prevUsers) => {
                let oldUsers = prevUsers
                let newUsers = data.users
                let updatedUsers = []
                // (mikekebert) Loop through the new users and check them against the existing array
                newUsers.forEach((newUser) => {
                  oldUsers.forEach((oldUser, index) => {
                    if (
                      oldUser !== null &&
                      newUser !== null &&
                      oldUser.user_id === newUser.user_id
                    ) {
                      // (mikekebert) If you find a match, delete the old copy from the old array
                      oldUsers.splice(index, 1)
                    }
                  })
                  updatedUsers.push(newUser)
                })
                // (mikekebert) When you reach the end of the list of new users, simply add any remaining old users to the new array
                if (oldUsers.length > 0)
                  updatedUsers = [...updatedUsers, ...oldUsers]
                // (mikekebert) Sort the array by data created, newest on top
                updatedUsers.sort((a, b) =>
                  a.created_at < b.created_at ? 1 : -1
                )

                return updatedUsers
              })
              removeLoadingProcess('USERS')

              break

            case 'USER':
              let user = data.user[0]
              setUser(user)
              break

            case 'USER_UPDATED':
              setUsers((prevUsers) => {
                return prevUsers.map((x) =>
                  x.user_id === data.updatedUser.user_id ? data.updatedUser : x
                )
              })
              setUser(data.updatedUser)

              break

            case 'PASSWORD_UPDATED':
              // (eldersonar) Replace the user with the updated user based on password)
              setUsers((prevUsers) => {
                return prevUsers.map((x) =>
                  x.user_id === data.updatedUserPassword.user_id
                    ? data.updatedUserPassword
                    : x
                )
              })

              break

            case 'USER_CREATED':
              setUsers((prevUsers) => {
                let updatedUsers = [...prevUsers, data.user[0]]
                return updatedUsers.sort((a, b) =>
                  a.created_at < b.created_at ? 1 : -1
                )
              })
              setUser(data.user[0])

              break

            case 'USER_DELETED':
              setUsers((prevUsers) => {
                const index = prevUsers.findIndex((v) => v.user_id === data)
                let alteredUsers = [...prevUsers]
                alteredUsers.splice(index, 1)
                return alteredUsers
              })

              break

            case 'USER_ERROR':
              // console.log('User Error', data.error)
              setErrorMessage(data.error)
              break

            case 'USER_SUCCESS':
              // console.log('USER SUCCESS')
              setSuccessMessage(data)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'CREDENTIALS':
          switch (type) {
            case 'CREDENTIALS':
              setCredentials((prevCred) => {
                let oldCredentials = prevCred
                let newCredentials = data.credential_records
                let updatedCredentials = []
                // (mikekebert) Loop through the new credentials and check them against the existing array
                newCredentials.forEach((newCredential) => {
                  oldCredentials.forEach((oldCredential, index) => {
                    if (
                      oldCredential !== null &&
                      newCredential !== null &&
                      oldCredential.credential_exchange_id ===
                        newCredential.credential_exchange_id
                    ) {
                      // (mikekebert) If you find a match, delete the old copy from the old array
                      oldCredentials.splice(index, 1)
                    }
                  })
                  updatedCredentials.push(newCredential)
                  // (mikekebert) We also want to make sure to reset any pending connection IDs so the modal windows don't pop up automatically
                  if (newCredential.connection_id === focusedConnectionID) {
                    setFocusedConnectionID('')
                  }
                })
                // (mikekebert) When you reach the end of the list of new credentials, simply add any remaining old credentials to the new array
                if (oldCredentials.length > 0)
                  updatedCredentials = [
                    ...updatedCredentials,
                    ...oldCredentials,
                  ]
                // (mikekebert) Sort the array by data created, newest on top
                updatedCredentials.sort((a, b) =>
                  a.created_at < b.created_at ? 1 : -1
                )

                return updatedCredentials
              })
              removeLoadingProcess('CREDENTIALS')

              break

            case 'CREDENTIALS_ERROR':
              // console.log('Credentials Error:', data.error)
              setErrorMessage(data.error)
              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }

          break
        case 'PRESENTATIONS':
          switch (type) {
            case 'VERIFIED':
              setNotification('Success - Verified Credential', 'notice')

              break

            case 'PRESENTATION_REPORTS':
              setPresentationReports((prevPresentations) => {
                let oldPresentations = prevPresentations
                let newPresentations = data.presentation_reports
                let updatedPresentations = []

                // (mikekebert) Loop through the new presentation and check them against the existing array
                newPresentations.forEach((newPresentation) => {
                  oldPresentations.forEach((oldPresentation, index) => {
                    if (
                      oldPresentation !== null &&
                      newPresentation !== null &&
                      oldPresentation.presentation_exchange_id ===
                        newPresentation.presentation_exchange_id
                    ) {
                      // (mikekebert) If you find a match, delete the old copy from the old array
                      console.log('splice', oldPresentation)
                      oldPresentations.splice(index, 1)
                    }
                  })
                  updatedPresentations.push(newPresentation)
                  // (mikekebert) We also want to make sure to reset any pending connection IDs so the modal windows don't pop up automatically
                  if (newPresentation.connection_id === focusedConnectionID) {
                    setFocusedConnectionID('')
                  }
                })
                // (mikekebert) When you reach the end of the list of new presentations, simply add any remaining old presentations to the new array
                if (oldPresentations.length > 0)
                  updatedPresentations = [
                    ...updatedPresentations,
                    ...oldPresentations,
                  ]
                // (mikekebert) Sort the array by date created, newest on top
                updatedPresentations.sort((a, b) =>
                  a.created_at < b.created_at ? 1 : -1
                )

                return updatedPresentations
              })
              removeLoadingProcess('PRESENTATIONS')

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'SERVER':
          switch (type) {
            case 'WEBSOCKET_READY':
              setReadyForMessages(true)
              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'SETTINGS':
          switch (type) {
            case 'SETTINGS_THEME':
              // Writing the recent theme to a local storage
              const stringMessageTheme = JSON.stringify(data.value)
              window.localStorage.setItem('recentTheme', stringMessageTheme)
              setTheme(data.value)
              removeLoadingProcess('THEME')
              break

            case 'SETTINGS_SCHEMAS':
              setSchemas(data)
              removeLoadingProcess('SCHEMAS')
              break

            case 'LOGO':
              setImage(data)
              removeLoadingProcess('LOGO')
              break

            case 'SETTINGS_ORGANIZATION':
              setOrganizationName(data.organizationName)
              setSiteTitle(data.title)
              removeLoadingProcess('ORGANIZATION')
              break

            case 'SETTINGS_SMTP':
              setSmtp(data.value)
              removeLoadingProcess('SMTP')
              break

            case 'SETTINGS_ERROR':
              // console.log('Settings Error:', data.error)
              setErrorMessage(data.error)
              break

            case 'SETTINGS_SUCCESS':
              setSuccessMessage(data)
              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }
          break

        case 'GOVERNANCE':
          switch (type) {
            case 'PRIVILEGES_ERROR':
              console.log(data)
              console.log('Privileges Error', data.error)
              setErrorMessage(data.error)
              removeLoadingProcess('GOVERNANCE')
              break

            case 'PRIVILEGES_SUCCESS':
              console.log('PRIVILEGES SUCCESS')
              console.log('these are the privileges:')
              console.log(data.privileges)
              setPrivileges(data.privileges)
              removeLoadingProcess('GOVERNANCE')
              break
            case 'ACTION_ERROR':
              setErrorMessage(data.error)
              break
            case 'ACTION_SUCCESS':
              setSuccessMessage(data.notice)
              break
            case 'PRIVILEGES_SUCCESS':
              setPrivileges(data.success)
              break

            case 'GOVERNANCE_OPTIONS':
              console.log('GOVERNANCE_OPTIONS SUCCESS')
              setGovernanceOptions(data.governance_paths)
              removeLoadingProcess('ALL_GOVERNANCE')
              break

            case 'GOVERNANCE_OPTION_ADDED':
              console.log('GOVERNANCE_OPTION_ADDED')
              setGovernanceOptions((prev) => {
                console.log(prev)
                console.log(data.governance_path)

                prev.forEach((governanceOption, index) => {
                  console.log('forEach')
                  console.log(governanceOption.governance_path)
                  console.log(data.governance_path)
                  if (
                    governanceOption !== null &&
                    data.governance_path !== null &&
                    governanceOption.governance_path ===
                      data.governance_path.governance_path
                  ) {
                    // (mikekebert) If you find a match, delete the old copy from the old array
                    console.log('splice', governanceOption)
                    prev.splice(index, 1)
                  }
                })

                let updatedGovernanceOptions = [...prev, data.governance_path]
                return updatedGovernanceOptions
              })

              break

            case 'SELECTED_GOVERNANCE':
              console.log('SELECTED_GOVERNANCE')
              console.log(data)

              setSelectedGovernance(data.selected_governance)
              removeLoadingProcess('SELECTED_GOVERNANCE')
              break

            case 'UPDATED_SELECTED_GOVERNANCE':
              console.log('UPDATED_SELECTED_GOVERNANCE')
              console.log(data)
              setSelectedGovernance(data.selected_governance)

              break

            default:
              setNotification(
                `Error - Unrecognized Websocket Message Type: ${type}`,
                'error'
              )
              break
          }

          break

        default:
          setNotification(
            `Error - Unrecognized Websocket Message Type: ${context}`,
            'error'
          )
          break
      }
    } catch (error) {
      console.log('Error caught:', error)
      setNotification('Client Error - Websockets', 'error')
    }
  }

  function addLoadingProcess(process) {
    loadingList.push(process)
  }

  function clearLoadingProcess() {
    loadingList = []
    setAppIsLoaded(true)
  }

  function removeLoadingProcess(process) {
    const index = loadingList.indexOf(process)
    if (index > -1) {
      loadingList.splice(index, 1)
    }

    if (loadingList.length === 0) {
      setAppIsLoaded(true)
    }
    console.log(loadingArray)
  }

  function setUpUser(id, username, roles) {
    setSession(cookies.get('sessionId'))
    setLoggedInUserId(id)
    setLoggedInUsername(username)
    setLoggedInRoles(roles)
  }

  // Update theme state locally
  const updateTheme = (update) => {
    return setTheme((prevTheme) => ({ ...prevTheme, ...update }))
  }

  // Update theme in the database
  const saveTheme = () => {
    sendMessage('SETTINGS', 'SET_THEME', theme)
  }

  //(RomanStepanyan) Removing all styles from an array of styles to desible undo button
  const clearStylesArray = () => {
    setStylesArray([])
  }

  const addStylesToArray = (key) => {
    let position = stylesArray.indexOf(key)
    // if cannot find indexOf style
    if (!~position) {
      setStylesArray((oldArray) => [...oldArray, `${key}`])
    }
  }

  const removeStylesFromArray = (undoKey) => {
    // Removing a style from an array of styles
    let index = stylesArray.indexOf(undoKey)
    if (index > -1) {
      stylesArray.splice(index, 1)
      setStylesArray(stylesArray)
    }
  }

  // Undo theme change
  const undoStyle = (undoKey) => {
    if (undoKey !== undefined) {
      for (let key in defaultTheme)
        if ((key = undoKey)) {
          const undo = { [`${key}`]: defaultTheme[key] }
          return setTheme((prevTheme) => ({ ...prevTheme, ...undo }))
        }
    }
  }

  // Resetting state of error and success messages
  const clearResponseState = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
  }

  // Logout and redirect
  const handleLogout = (history) => {
    Axios({
      method: 'POST',
      url: '/api/user/log-out',
      withCredentals: true,
    }).then((res) => {
      setLoggedIn(false)
      setSession('')
      setWebsocket(false)
      setLoggedInUserState(null)
      setLoggedInUserId('')
      setLoggedInUsername('')
      setLoggedInRoles([])

      // (eldersonar) Does this close the connection and remove the connection object?
      closeWSConnection(1000, 'Log out')
      if (history !== undefined) {
        history.push('/login')
      }
    })
  }

  if ((loggedIn && !appIsLoaded) || (!loggedIn && !appIsLoaded)) {
    // Show the spinner while the app is loading
    return (
      <ThemeProvider theme={theme}>
        <FullPageSpinner />
      </ThemeProvider>
    )
  } else if (!loggedIn && appIsLoaded) {
    return (
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <Router>
            <Switch>
              <Route
                path="/forgot-password"
                render={({ match, history }) => {
                  return (
                    <Frame id="app-frame">
                      <Main>
                        <ForgotPassword
                          logo={image}
                          history={history}
                          sendRequest={sendMessage}
                          user={user}
                          users={users}
                        />
                      </Main>
                    </Frame>
                  )
                }}
              />
              <Route
                path="/password-reset"
                render={({ match, history }) => {
                  return (
                    <Frame id="app-frame">
                      <Main>
                        <PasswordReset
                          logo={image}
                          history={history}
                          sendRequest={sendMessage}
                          user={user}
                          users={users}
                        />
                      </Main>
                    </Frame>
                  )
                }}
              />
              <Route
                path="/account-setup"
                render={({ match, history }) => {
                  return (
                    <Frame id="app-frame">
                      <Main>
                        <AccountSetup
                          logo={image}
                          history={history}
                          sendRequest={sendMessage}
                          messageHandler={messageHandler}
                          user={user}
                          users={users}
                        />
                      </Main>
                    </Frame>
                  )
                }}
              />
              <Route
                path="/login"
                render={({ match, history }) => {
                  return (
                    <Frame id="app-frame">
                      <Main>
                        <Login
                          logo={image}
                          history={history}
                          setUpUser={setUpUser}
                          sendRequest={sendMessage}
                          setLoggedIn={setLoggedIn}
                        />
                      </Main>
                    </Frame>
                  )
                }}
              />
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    )
  } else {
    // loggedIn and appIsLoaded
    return (
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <SessionProvider logout={handleLogout} sessionTimer={sessionTimer}>
            <Router>
              <Switch>
                <Route exact path="/forgot-password">
                  <Redirect to="/" />
                </Route>
                <Route exact path="/password-reset">
                  <Redirect to="/" />
                </Route>
                <Route exact path="/account-setup">
                  <Redirect to="/" />
                </Route>
                <Route exact path="/login">
                  <Redirect to="/" />
                </Route>
                <Route
                  path="/"
                  exact
                  render={({ match, history }) => {
                    return (
                      <Frame id="app-frame">
                        <AppHeader
                          loggedInUserState={loggedInUserState}
                          logo={image}
                          organizationName={organizationName}
                          loggedInUsername={loggedInUsername}
                          match={match}
                          history={history}
                          handleLogout={handleLogout}
                        />
                        <Main>
                          <Home
                            loggedInUserState={loggedInUserState}
                            history={history}
                            sendRequest={sendMessage}
                            privileges={privileges}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                            clearResponseState={clearResponseState}
                            QRCodeURL={QRCodeURL}
                            // outOfBandQRCodeURL={outOfBandQRCodeURL}
                            focusedConnectionID={focusedConnectionID}
                            contact={contact}
                          />
                        </Main>
                        <AppFooter
                          selectedGovernance={selectedGovernance}
                        ></AppFooter>
                      </Frame>
                    )
                  }}
                />
                <Route
                  path="/invitations"
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'invitations:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <p>Invitations</p>
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                <Route
                  path="/contacts"
                  exact
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'contacts:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Contacts
                              loggedInUserState={loggedInUserState}
                              history={history}
                              sendRequest={sendMessage}
                              contacts={contacts}
                              QRCodeURL={QRCodeURL}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                <Route
                  path={`/contacts/:contactId`}
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'contacts:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Contact
                              loggedInUserState={loggedInUserState}
                              history={history}
                              sendRequest={sendMessage}
                              successMessage={successMessage}
                              errorMessage={errorMessage}
                              clearResponseState={clearResponseState}
                              privileges={privileges}
                              contactId={match.params.contactId}
                              contacts={contacts}
                              schemas={schemas}
                              credentials={credentials}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                <Route
                  path="/credentials"
                  exact
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'credentials:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Credentials
                              history={history}
                              credentials={credentials}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                <Route
                  path={`/credentials/:credentialId`}
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'credentials:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Credential
                              history={history}
                              credential={match.params.credentialId}
                              credentials={credentials}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                  credentials={credentials}
                />
                <Route
                  path="/verification"
                  render={({ match, history }) => {
                    return (
                      <Frame id="app-frame">
                        <AppHeader
                          loggedInUserState={loggedInUserState}
                          loggedInUsername={loggedInUsername}
                          logo={image}
                          organizationName={organizationName}
                          match={match}
                          history={history}
                          handleLogout={handleLogout}
                        />
                        <Main>
                          <p>Verification</p>
                        </Main>
                        <AppFooter
                          selectedGovernance={selectedGovernance}
                        ></AppFooter>
                      </Frame>
                    )
                  }}
                />
                <Route
                  path="/messages"
                  render={({ match, history }) => {
                    return (
                      <Frame id="app-frame">
                        <AppHeader
                          loggedInUserState={loggedInUserState}
                          loggedInUsername={loggedInUsername}
                          logo={image}
                          organizationName={organizationName}
                          match={match}
                          history={history}
                          handleLogout={handleLogout}
                        />
                        <Main>
                          <p>Messages</p>
                        </Main>
                        <AppFooter
                          selectedGovernance={selectedGovernance}
                        ></AppFooter>
                      </Frame>
                    )
                  }}
                />
                <Route
                  path="/presentations"
                  exact
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'presentations:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Presentations
                              history={history}
                              presentationReports={presentationReports}
                              contacts={contacts}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                <Route
                  path={`/presentations/:presentationId`}
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'presentations:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Presentation
                              history={history}
                              presentation={match.params.presentationId}
                              presentationReports={presentationReports}
                              contacts={contacts}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                  presentationReports={presentationReports}
                />
                <Route
                  path="/users"
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'users:read')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Users
                              loggedInUserState={loggedInUserState}
                              roles={roles}
                              users={users}
                              user={user}
                              successMessage={successMessage}
                              errorMessage={errorMessage}
                              clearResponseState={clearResponseState}
                              sendRequest={sendMessage}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                <Route
                  path={`/users/:userId`}
                  render={({ match, history }) => {
                    return (
                      <Frame id="app-frame">
                        <AppHeader
                          loggedInUserState={loggedInUserState}
                          loggedInUsername={loggedInUsername}
                          logo={image}
                          organizationName={organizationName}
                          match={match}
                          history={history}
                          handleLogout={handleLogout}
                        />
                        <Main>
                          <User
                            logo={image}
                            organizationName={organizationName}
                            history={history}
                          />
                        </Main>
                        <AppFooter
                          selectedGovernance={selectedGovernance}
                        ></AppFooter>
                      </Frame>
                    )
                  }}
                />
                <Route
                  path="/settings"
                  render={({ match, history }) => {
                    if (check(rules, loggedInUserState, 'settings:update')) {
                      return (
                        <Frame id="app-frame">
                          <AppHeader
                            loggedInUserState={loggedInUserState}
                            loggedInUsername={loggedInUsername}
                            logo={image}
                            organizationName={organizationName}
                            match={match}
                            history={history}
                            handleLogout={handleLogout}
                          />
                          <Main>
                            <Settings
                              updateTheme={updateTheme}
                              saveTheme={saveTheme}
                              undoStyle={undoStyle}
                              errorMessage={errorMessage}
                              successMessage={successMessage}
                              clearResponseState={clearResponseState}
                              imageResponse={image}
                              stylesArray={stylesArray}
                              clearStylesArray={clearStylesArray}
                              addStylesToArray={addStylesToArray}
                              removeStylesFromArray={removeStylesFromArray}
                              sendRequest={sendMessage}
                              smtp={smtp}
                              organizationName={organizationName}
                              siteTitle={siteTitle}
                              governanceOptions={governanceOptions}
                              selectedGovernance={selectedGovernance}
                            />
                          </Main>
                          <AppFooter
                            selectedGovernance={selectedGovernance}
                          ></AppFooter>
                        </Frame>
                      )
                    } else {
                      return <Route render={() => <Redirect to="/" />} />
                    }
                  }}
                />
                {/* Redirect to root if no route match is found */}
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </Router>
          </SessionProvider>
        </NotificationProvider>
      </ThemeProvider>
    )
  }
}

export default App
