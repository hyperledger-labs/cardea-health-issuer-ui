import Axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useNotification } from './NotificationProvider'
// import { handleImageSrc } from './util'
// import { setLogo } from '../redux/settingsReducer'

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

function ForgotPassword(props) {
  // const [user, setUser] = useState({})

  // const [logo, setLogo] = useState(null)
  const settingsState = useSelector((state) => state.settings)
  const logo = settingsState.logo
  // const dispatch = useDispatch()

  // Accessing notification context
  const setNotification = useNotification()

  // useEffect(() => {
  //   // Fetching the logo
  //   Axios({
  //     method: 'GET',
  //     url: '/api/logo',
  //   }).then((res) => {
  //     if (res.data.error) {
  //       setNotification(res.data.error, 'error')
  //     } else {
  //       dispatch(setLogo(handleImageSrc(res.data[0].image.data)))
  //     }
  //   })
  // }, [setNotification])

  const emailForm = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(emailForm.current)
    const email = form.get('email')

    // Update the DB, show the notification and redirect to the login view
    Axios({
      method: 'POST',
      data: {
        email: email,
        flag: 'password reset',
      },
      url: '/api/user/update',
    }).then((res) => {
      if (res.data.error) {
        if (res.data.error === 'The user was not found.') {
          setNotification(
            `If this user exists, a password reset email has been sent.`,
            'notice'
          )
          props.history.push('/')
        } else {
          setNotification(res.data.error, 'error')
        }
      } else {
        // setUser(res.data)
        setNotification(
          `If this user exists, a password reset email has been sent`,
          'notice'
        )
        props.history.push('/')
      }
    })
  }

  return (
    <FormContainer>
      <LogoHolder>
        {logo ? <Logo src={logo} alt="Logo" /> : <Logo />}
      </LogoHolder>
      <Form id="form" onSubmit={handleSubmit} ref={emailForm}>
        <InputBox>
          <Label htmlFor="email">Email</Label>
          <InputField type="email" name="email" id="email" required />
        </InputBox>
        <SubmitBtn type="submit">Reset</SubmitBtn>
      </Form>
    </FormContainer>
  )
}
export default ForgotPassword
