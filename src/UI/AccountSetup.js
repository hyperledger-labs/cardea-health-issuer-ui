import Axios from 'axios'
import React, { useRef, useLayoutEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

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

function AccountSetup(props) {
  const token = window.location.hash.substring(1)

  const [id, setId] = useState({})

  useLayoutEffect(() => {
    let isMounted = true
    // Kick the user off this page if trying to access without a token
    if (!token) {
      props.history.push('/login')
      return
    }

    const decoded = jwt_decode(token)
    // Check if the token is expired
    if (Date.now() >= decoded.exp * 1000) {
      console.log('The link has expired')
      setNotification("The user doesn't exist or the link has expired", 'error')
      props.history.push('/login')
    } else {
      if (isMounted) {
        setId(decoded.id)
      }
    }

    // Check the token on the back end
    Axios({
      method: 'POST',
      data: {
        token: token,
      },
      url: '/api/user/token/validate',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
        props.history.push('/login')
      }
    })
    return () => {
      isMounted = false
    } // Cleanup
  }, [])

  const [logo, setLogo] = useState(null)

  useLayoutEffect(() => {
    let isMounted = true
    // Fetch the logo
    Axios({
      method: 'GET',
      url: '/api/logo',
    }).then((res) => {
      if (res.data.error) {
        setNotification(res.data.error, 'error')
      } else {
        if (isMounted) {
          setLogo(handleImageSrc(res.data[0].image.data))
        }
      }
    })
    return () => {
      isMounted = false
    } // Cleanup
  }, [])

  // Access the notification context
  const setNotification = useNotification()

  const accSetupForm = useRef()
  const pass1 = useRef()
  const pass2 = useRef()
  const username = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(accSetupForm.current)

    // Check the password match
    if (pass1.current.value != pass2.current.value) {
      console.log("Passwords don't match")
      setNotification('Passwords do not match. Please try again', 'error')
    } else if (pass1.current.value === username.current.value) {
      console.log('Password should not match username')
      setNotification(
        'Password should not match username. Please try again',
        'error'
      )
    } else {
      // Update the user, redirect to login and setup notification
      Axios({
        method: 'POST',
        data: {
          id: id,
          username: form.get('username'),
          email: form.get('email'),
          password: form.get('password'),
          token: token,
          flag: 'set-up user',
        },
        url: '/api/user/update',
      }).then((res) => {
        if (res.data.status) {
          setNotification(res.data.status, 'notice')
          props.history.push('/')
        } else if (res.data.error) {
          setNotification(res.data.error, 'error')
        } else {
          setNotification(
            "User couldn't be updated. Please try again.",
            'error'
          )
        }
      })
    }
  }

  return (
    <FormContainer>
      <LogoHolder>
        {logo ? <Logo src={logo} alt="Logo" /> : <Logo />}
      </LogoHolder>
      <Form id="form" onSubmit={handleSubmit} ref={accSetupForm}>
        <InputBox>
          <Label htmlFor="email">Email</Label>
          <InputField type="email" name="email" id="email" required />
        </InputBox>
        <InputBox>
          <Label htmlFor="Username">Username</Label>
          <InputField
            type="Username"
            name="username"
            id="username"
            ref={username}
            required
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="password">Password</Label>
          <InputField
            type="password"
            name="password"
            id="password"
            ref={pass1}
            required
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="confirmedPass">Confirm Password</Label>
          <InputField
            type="password"
            name="confirmedPass"
            id="confirmedPass"
            ref={pass2}
            required
          />
        </InputBox>
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </Form>
    </FormContainer>
  )
}

export default AccountSetup
