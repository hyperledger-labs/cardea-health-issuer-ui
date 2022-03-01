import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { CanUser } from './CanUser'

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  & ul {
    display: none;
    position: relative;
    padding: 0 0 0 20px;
  }
`
const Item = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.border};
  &:first-child {
    border-top: 1px solid ${(props) => props.theme.border};
  }
  & li,
  & li:first-child {
    border: none;
  }
  & a.active {
    border-right: 3px solid ${(props) => props.theme.primary_color};
    background: ${(props) => props.theme.background_secondary};
  }
  &.active ul {
    display: block;
  }
`
const StyledLink = styled(NavLink)`
  display: block;
  padding: 20px 0 20px 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props) => props.theme.text_color};
  &:hover,
  &.active {
    text-decoration: underline;
    color: ${(props) => props.theme.primary_color};
    border-right: 3px solid ${(props) => props.theme.primary_color};
    background: ${(props) => props.theme.background_secondary};
  }
`
const StyledSubLink = styled(NavLink)`
  display: block;
  padding: 10px 0 10px 20px;
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => props.theme.text_color};
  &:hover,
  &.active {
    text-decoration: underline;
    color: ${(props) => props.theme.primary_color};
    background: none;
  }
`
function AppMenu(props) {
  const localUser = props.loggedInUserState

  let pathMatch = ''
  if (props.match.path !== undefined) {
    pathMatch = props.match.path
  }
  if (localUser) {
    return (
      <nav id="app-menu">
        <List>
          <Item className={pathMatch === '/' ? 'active' : undefined}>
            <StyledLink exact to="/">
              Home
            </StyledLink>
          </Item>
          {/*<Item className={pathMatch === '/invitations' ? 'active' : undefined}>
            <StyledLink to="/invitations">
              Invitations
            </StyledLink>
          </Item>*/}
          <CanUser
            user={localUser}
            perform="contacts:read"
            yes={() => (
              <Item
                className={
                  pathMatch.includes('/contacts') ? 'active' : undefined
                }
              >
                <StyledLink to="/contacts">Contacts</StyledLink>
                {/*<List>
              <Item className={pathMatch === '/contacts' ? 'active' : undefined}>
                <StyledSubLink exact to="/contacts">
                  Contacts
                </StyledSubLink>
              </Item>
              <Item>
                <StyledSubLink to="/contacts/invitations">
                  Invitations
                </StyledSubLink>
              </Item>
            </List>*/}
              </Item>
            )}
          />
          <CanUser
            user={localUser}
            perform="credentials:read"
            yes={() => (
              <Item
                className={pathMatch === '/credentials' ? 'active' : undefined}
              >
                <StyledLink to="/credentials">Credentials</StyledLink>
              </Item>
            )}
          />
          <CanUser
            user={localUser}
            perform="presentations:read"
            yes={() => (
              <Item
                className={
                  pathMatch === '/presentations' ? 'active' : undefined
                }
              >
                <StyledLink to="/presentations">Presentations</StyledLink>
              </Item>
            )}
          />
          <CanUser
            user={localUser}
            perform="users:read"
            yes={() => (
              <Item className={pathMatch === '/users' ? 'active' : undefined}>
                <StyledLink to="/users">Users</StyledLink>
              </Item>
            )}
          />
          {/* <CanUser
            user={localUser}
            perform="basicMessages:read"
            yes={() => (
              <>
                <Item
                  className={pathMatch === '/messages' ? 'active' : undefined}
                >
                  <StyledLink to="/messages">Messages</StyledLink>
                </Item>
              </>
            )}
          /> */}
          <CanUser
            user={localUser}
            perform="settings:read"
            yes={() => (
              <>
                <Item
                  className={pathMatch === '/settings' ? 'active' : undefined}
                >
                  <StyledLink to="/settings">Settings</StyledLink>
                </Item>
              </>
            )}
            no={() => ''}
          />
        </List>
      </nav>
    )
  } else return null
}
export default AppMenu
