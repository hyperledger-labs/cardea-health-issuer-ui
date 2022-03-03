import React, { useState } from 'react'

import styled from 'styled-components'

import FormQR from './FormQR'
import FormInvitationAccept from './FormInvitationAccept'
// import { useNotification } from './NotificationProvider'

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
  margin: 30px 1% 0px 0px;
  padding: 0 25px;
  font-size: calc(12px + .8vw);
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
  const localUser = props.loggedInUserState

  // Accessing notification context
  // const setNotification = useNotification()

  const [oob, setOOB] = useState(false)

  const [scanModalIsOpen, setScanModalIsOpen] = useState(false)
  const [displayModalIsOpen, setDisplayModalIsOpen] = useState(false)

  const closeScanModal = () => setScanModalIsOpen(false)
  const closeDisplayModal = () => setDisplayModalIsOpen(false)

  const scanInvite = (type) => {
    type === 'oob' ? setOOB(true) : setOOB(false)

    setScanModalIsOpen((o) => !o)
  }

  const presentOutOfBand = () => {
    setDisplayModalIsOpen((o) => !o)
    props.sendRequest('OUT_OF_BAND', 'CREATE_INVITATION', {})
  }

  const presentInvitation = () => {
    setDisplayModalIsOpen((o) => !o)
    props.sendRequest('INVITATIONS', 'CREATE_SINGLE_USE', {})
  }

  return (
    <>
      <DashboardRow>
        <CanUser
          user={localUser}
          perform="contacts:create"
          yes={() => (
            <DashboardButton onClick={() => scanInvite('connection')}>
              Scan QR Code
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
              Scan OOB
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
