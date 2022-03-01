import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'

import FormQR from './FormQR'
import FormInvitationAccept from './FormInvitationAccept'
import { useNotification } from './NotificationProvider'

import { CanUser } from './CanUser'

const DashboardRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const DashboardButton = styled.div`
  width: 32%;
  min-width: 240px;
  height: 150px;
  margin-bottom: 30px;
  padding: 0 25px;
  font-size: calc(12px + 1.5vw);
  line-height: 150px;
  vertical-align: center;
  text-transform: uppercase;
  background: ${(props) => props.theme.primary_color};
  color: ${(props) => props.theme.text_light};
  box-shadow: ${(props) => props.theme.drop_shadow};
  text-align: center;

  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.background_primary};
    color: ${(props) => props.theme.text_color};
  }
`

const DashboardPlaceholder = styled.div`
  width: 32%;
  min-width: 240px;
  height: 150px;
  margin-bottom: 30px;
  padding: 0 25px;
`

function Home(props) {
  const error = props.errorMessage
  const success = props.successMessage
  const localUser = props.loggedInUserState
  const privileges = props.privileges

  const [index, setIndex] = useState(false)
  const [scanModalIsOpen, setScanModalIsOpen] = useState(false)
  const [displayModalIsOpen, setDisplayModalIsOpen] = useState(false)

  const isMounted = useRef(null)

  // Accessing notification context
  const setNotification = useNotification()

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      props.clearResponseState()
    } else if (error) {
      setNotification(error, 'error')
      props.clearResponseState()
      setIndex(index + 1)
    } else return
  }, [error, success])

  // Get governance privileges
  useEffect(() => {
    isMounted.current = true
    props.sendRequest('GOVERNANCE', 'GET_PRIVILEGES', {})
    return () => {
      isMounted.current = false
    }
  }, [])

  const closeScanModal = () => setScanModalIsOpen(false)
  const closeDisplayModal = () => setDisplayModalIsOpen(false)

  const scanInvite = () => {
    setScanModalIsOpen((o) => !o)
  }

  const presentInvite = () => {
    if (privileges && privileges.includes('verify_identity')) {
      setDisplayModalIsOpen((o) => !o)
      props.sendRequest('INVITATIONS', 'CREATE_SINGLE_USE', {})
    } else
      setNotification("Error: you don't have the right privileges", 'error')
  }

  return (
    <>
      <DashboardRow>
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={scanInvite}>Scan QR Code</DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={presentInvite}>
              Display QR Code
            </DashboardButton>
          )}
        />
        <DashboardPlaceholder></DashboardPlaceholder>
      </DashboardRow>
      <FormInvitationAccept
        contactModalIsOpen={scanModalIsOpen}
        closeContactModal={closeScanModal}
        sendRequest={props.sendRequest}
      />
      <FormQR
        contactModalIsOpen={displayModalIsOpen}
        closeContactModal={closeDisplayModal}
        QRCodeURL={props.QRCodeURL}
        sendRequest={props.sendRequest}
      />
    </>
  )
}

export default Home
