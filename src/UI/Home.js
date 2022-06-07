import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import FormQR from './FormQR'
import FormInvitationAccept from './FormInvitationAccept'
import { useNotification } from './NotificationProvider'

import { CanUser } from './CanUser'

const DashboardRow = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`

const DashboardButton = styled.div`
  width: 24%;
  min-width: 240px;
  height: 150px;
  margin: 0px 1% 30px 0px;
  padding: 0 25px;
  font-size: calc(12px + 1vw);
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

function Home(props) {
  const error = props.errorMessage
  const success = props.successMessage
  const warning = props.warningMessage
  const localUser = props.loggedInUserState
  const history = props.history
  const contact = props.contact

  // Redirect to contact when contact is created
  useEffect(() => {
    if (displayModalIsOpen && contact.contact_id && history !== undefined) {
      closeScanModal()
      history.push('/contacts/' + contact.contact_id)
    }
  }, [props.contact])
  // const privileges = props.privileges

  // const [govGranted, setGovGranted] = useState(undefined)

  const [index, setIndex] = useState(false)

  const [oob, setOOB] = useState(false)

  const [scanModalIsOpen, setScanModalIsOpen] = useState(false)
  const [displayModalIsOpen, setDisplayModalIsOpen] = useState(false)

  const closeScanModal = () => setScanModalIsOpen(false)
  const closeDisplayModal = () => setDisplayModalIsOpen(false)

  // const isMounted = useRef(null)

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
    } else if (warning) {
      setNotification(warning, 'warning')
      props.clearResponseState()
      setIndex(index + 1)
    } else return
  }, [error, success, warning])

  const scanInvite = (type) => {
    type === 'oob' ? setOOB(true) : setOOB(false)

    setScanModalIsOpen((o) => !o)
  }

  const presentOutOfBand = () => {
    // Simple use of governance
    // if (privileges && privileges.includes('verify_identity')) {
    setDisplayModalIsOpen((o) => !o)
    props.sendRequest('OUT_OF_BAND', 'CREATE_INVITATION', {})
    // } else {
    //   setNotification("Error: you don't have the right privileges", 'error')
    // }
  }

  const presentInvitation = () => {
    // if (privileges && privileges.includes('verify_identity')) {
    setDisplayModalIsOpen((o) => !o)
    props.sendRequest('INVITATIONS', 'CREATE_SINGLE_USE', {})
    // } else {
    //   setNotification("Error: you don't have the right privileges", 'error')
    // }
  }

  return (
    <>
      <DashboardRow>
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={() => scanInvite('connection')}>
              Accept Invitation
            </DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={presentInvitation}>
              Display QR Code
            </DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={() => scanInvite('oob')}>
              Accept OOB
            </DashboardButton>
          )}
        />
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={presentOutOfBand}>
              Display OOB
            </DashboardButton>
          )}
        />
      </DashboardRow>
      <FormInvitationAccept
        oob={oob}
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
