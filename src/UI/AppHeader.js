import React from 'react'
import { useSelector } from 'react-redux'

import AppMenu from './AppMenu.js'
import { Logo, LogoHolder } from './CommonStylesForms'

import styled from 'styled-components'

const Header = styled.header`
  flex: 3;
  /*grid-row: 1;
  grid-column: 1;*/
  min-width: 240px;
  max-width: 240px;
  min-height: 100vh;
  background: ${(props) => props.theme.background_primary};
`

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  width: 100%;
`

const OrganizationName = styled.h3`
  margin: 10px 0;
  color: ${(props) => props.theme.secondary_color};
  text-align: center;
  text-transform: uppercase;
`

const UserName = styled.h4`
  color: ${(props) => props.theme.primary_color};
  margin: 0;

  text-transform: uppercase;

  // &:hover {
  //   text-decoration: underline;
  //   cursor: pointer;
  // }
`

const Logout = styled.button`
  margin: 5px 12px 0 12px;
  border: none;
  background: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

function AppHeader(props) {
  const settingsState = useSelector((state) => state.settings)
  const loginState = useSelector((state) => state.login)

  const logo = settingsState.logo
  const organizationName = settingsState.organizationName

  const handleLogout = () => {
    props.handleLogout(props.history)
  }

  const handleUserProfile = (e) => {
    e.preventDefault()
  }

  return (
    <Header id="app-header">
      <LogoHolder>
        <Logo src={logo} alt="Logo" />
      </LogoHolder>
      <OrganizationName>{organizationName}</OrganizationName>
      <LogoutWrapper>
        <UserName onClick={handleUserProfile}>
          {loginState.loggedInUsername}
        </UserName>
        <Logout onClick={handleLogout}>Log Out</Logout>
      </LogoutWrapper>
      <AppMenu match={props.match} />
    </Header>
  )
}

export default AppHeader
