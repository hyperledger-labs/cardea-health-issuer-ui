import Axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { useNotification } from './NotificationProvider'
import { handleImageSrc } from './util'

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
  const [logo, setLogo] = useState(null)

  // Accessing notification context
  const setNotification = useNotification()

  useEffect(() => {
    // Fetching the logo
    Axios({
      method: 'GET',
      url: '/api/logo',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
      } else {
        setLogo(handleImageSrc(res.data[0].image.data))
      }
    })
  }, [setNotification])

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
        props.setLoggedIn(true)

        props.setUpUser(res.data.id, res.data.username, res.data.roles)
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
