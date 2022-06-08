import React, { useCallback, useEffect, useState, useRef } from 'react'

import {
  StyledPopup,
  Modal,
  ModalHeader,
  ModalContent,
  ModalContentWrapper,
  FormContainer,
  InputFieldModal,
  ModalLabel,
  Actions,
  CloseBtn,
  CancelBtn,
  SubmitBtnModal,
} from './CommonStylesForms'

function FormInvitationAccept(props) {
  const invitationForm = useRef()

  const { closeContactModal } = props
  const closeModal = useCallback(() => {
    closeContactModal()
  }, [closeContactModal])

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = invitationForm.current

    if (props.oob) {
      props.sendRequest(
        'OUT_OF_BAND',
        'ACCEPT_INVITATION',
        `${form['invitation'].value}`
      )
    } else {
      props.sendRequest(
        'INVITATIONS',
        'ACCEPT_INVITATION',
        `${form['invitation'].value}`
      )
    }

    closeModal()
    // window.location.reload()
  }

  return (
    <StyledPopup
      open={props.contactModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Scan QR Code</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit} ref={invitationForm}>
              <FormContainer>
                <ModalLabel htmlFor="invitation">Invitation</ModalLabel>
                <InputFieldModal
                  type="invitation"
                  name="invitation"
                  id="invitation"
                  placeholder="Invitation URL"
                  required
                />
              </FormContainer>
              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtnModal type="submit">Submit</SubmitBtnModal>
              </Actions>
            </form>
          </ModalContent>
          <CloseBtn onClick={closeModal}>&times;</CloseBtn>
        </ModalContentWrapper>
      </Modal>
    </StyledPopup>
  )
}

export default FormInvitationAccept
