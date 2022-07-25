import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
// import { useTheme } from 'styled-components'

import { IconHelp } from './CommonStylesTables'

import {
  Actions,
  CancelBtn,
  Checkbox,
  CheckboxHolder,
  CloseBtn,
  InputBox,
  InputFieldModal,
  Modal,
  ModalContentWrapper,
  ModalContent,
  ModalHeader,
  ModalLabel,
  StyledPopup,
  SubmitBtnModal,
} from './CommonStylesForms'

function FormUsers(props) {
  const usersState = useSelector((state) => state.users)
  const settingsState = useSelector((state) => state.settings)

  const theme = settingsState.theme
  const roles = usersState.roles
  const error = props.error

  const [options, setOptions] = useState([])

  const userForm = useRef()
  const submitBtn = useRef()

  useEffect(() => {
    if (error && submitBtn.current) {
      submitBtn.current.removeAttribute('disabled')
    }
  }, [error])

  // Disable button on submit
  const onBtnClick = (e) => {
    if (submitBtn.current) {
      submitBtn.current.setAttribute('disabled', 'disabled')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onBtnClick()

    const form = new FormData(userForm.current)
    const email = form.get('email')

    const user = {
      email: email,
      roles: options,
    }

    props.sendRequest('USERS', 'CREATE', user)
    setOptions([])
  }

  function closeModal() {
    props.closeUserModal()
  }

  const handleCheckboxChange = (event) => {
    let newArray = [...options, event.target.value]
    if (options.includes(event.target.value)) {
      newArray = newArray.filter((s) => s !== event.target.value)
    }
    setOptions(newArray)
  }

  const rolesOptions = roles.map((role) => {
    return (
      <div key={role.role_id}>
        <Checkbox
          type="checkbox"
          value={role.role_id}
          id={role.role_id}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={role.role_id}>{role.role_name}</label>
      </div>
    )
  })

  return (
    <StyledPopup
      open={props.userModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Create New User</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit} ref={userForm}>
              <InputBox>
                <ModalLabel htmlFor="email">Email</ModalLabel>
                <InputFieldModal
                  type="email"
                  name="email"
                  id="email"
                  placeholder="foo@bar.com"
                  required
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="roles">
                  Roles
                  <IconHelp
                    alt="Help"
                    data-tip
                    data-for="rolesTip"
                    data-delay-hide="250"
                  />
                </ModalLabel>
                <ReactTooltip
                  id="rolesTip"
                  effect="solid"
                  type="info"
                  backgroundColor={theme.primary_color}
                >
                  <span>
                    Select which roles the user
                    <br />
                    will have in the system
                  </span>
                </ReactTooltip>
                <CheckboxHolder>{rolesOptions}</CheckboxHolder>
              </InputBox>
              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtnModal type="submit" ref={submitBtn}>
                  Submit
                </SubmitBtnModal>
              </Actions>
            </form>
          </ModalContent>
        </ModalContentWrapper>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormUsers
