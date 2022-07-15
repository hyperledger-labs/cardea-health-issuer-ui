import Axios from 'axios'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { useNotification } from './NotificationProvider'
import { setLoggedIn } from '../redux/loginReducer'

import {
  FormContainer,
  InputBox,
  LogoHolder,
  Logo,
  Form,
  Label,
  SubmitBtn,
  InputField,
} from './CommonStylesForms'

const ForgotPasswordLink = styled.a`
  margin-top: 30px;
  font-size: 1.2em;
  :hover {
    cursor: pointer;
  }
`

function Login(props) {
  const settingsState = useSelector((state) => state.settings)
  const logo = settingsState.logo
  const dispatch = useDispatch()
  const { setUpUser } = props

  // Accessing notification context
  const setNotification = useNotification()

  const loginForm = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(loginForm.current)

    Axios({
      method: 'POST',
      data: {
        username: form.get('user'),
        password: form.get('password'),
      },
      url: '/api/user/log-in',
    }).then((res) => {
      if (res.data.error) setNotification(res.data.error, 'error')
      else {
        dispatch(setLoggedIn(true))
        setUpUser(res.data.id, res.data.username, res.data.roles)
      }
    })
  }

  const handleForgot = (e) => {
    e.preventDefault()
    props.history.push('/forgot-password')
  }

  return (
    <FormContainer>
      <LogoHolder>
        {logo ? <Logo src={logo} alt="Logo" /> : <Logo />}
      </LogoHolder>
      <Form id="form" onSubmit={handleSubmit} ref={loginForm}>
        <InputBox>
          <Label htmlFor="user">User Name</Label>
          <InputField type="text" name="user" id="user" required />
        </InputBox>
        <InputBox>
          <Label htmlFor="password">Password</Label>
          <InputField type="password" name="password" id="password" required />
        </InputBox>
        <SubmitBtn type="submit">Log In</SubmitBtn>
      </Form>
      <ForgotPasswordLink onClick={handleForgot}>
        Forgot password?
      </ForgotPasswordLink>
    </FormContainer>
  )
}

export default Login
