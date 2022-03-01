import React, { useRef } from 'react'

import {
  StyledPopup,
  InputBox,
  Modal,
  ModalHeader,
  ModalSubHeader,
  ModalContentWrapper,
  ModalContent,
  CloseBtn,
  Actions,
  CancelBtn,
  SubmitBtnModal,
  ModalLabel,
  InputFieldModal,
} from './CommonStylesForms'

function FormContacts(props) {
  // Assigning contact values from props
  const contact_id = props.contactSelected
    ? JSON.parse(JSON.stringify(props.contactSelected.contact_id))
    : ''
  const surnames =
    props.contactSelected && props.contactSelected.Demographics
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.surnames))
      : ''
  const given_names =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.given_names)
        )
      : ''
  const date_of_birth =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Demographic.date_of_birth.split('T')[0]
          )
        )
      : ''
  const gender_legal =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.gender_legal)
        )
      : ''
  const street_address =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.street_address)
        )
      : ''
  const city =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.city))
      : ''
  const state_province_region =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Demographic.state_province_region
          )
        )
      : ''
  const postalcode =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.postalcode))
      : ''
  const country =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.country))
      : ''
  const phone =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.phone))
      : ''
  const email =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.email))
      : ''
  const medical_release_id =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.medical_release_id)
        )
      : ''

  const contactForm = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(contactForm.current)

    // Assembling demographics JSON
    const demographics = {}
    demographics.contact_id = props.contactSelected.contact_id
    demographics.surnames = form.get('surnames')
    demographics.given_names = form.get('given_names')
    demographics.date_of_birth = form.get('date_of_birth')
    demographics.gender_legal = form.get('gender_legal')
    demographics.street_address = form.get('street_address')
    demographics.city = form.get('city')
    demographics.state_province_region = form.get('state_province_region')
    demographics.postalcode = form.get('postalcode')
    demographics.country = form.get('country')
    demographics.phone = form.get('phone')
    demographics.email = form.get('email')
    demographics.medical_release_id = form.get('medical_release_id')

    props.submitDemographics(demographics, e)

    props.closeContactModal()
    window.location.reload()
  }

  function closeModal() {
    props.closeContactModal()
  }

  return (
    <StyledPopup
      open={props.contactModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Edit Contact</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form id="form" onSubmit={handleSubmit} ref={contactForm}>
              <ModalSubHeader>Demographics</ModalSubHeader>
              <InputBox>
                <ModalLabel htmlFor="contact_id"></ModalLabel>
                <InputFieldModal
                  type="hidden"
                  name="contact_id"
                  defaultValue={contact_id}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_id">
                  Medical Release ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_id"
                  defaultValue={medical_release_id}
                  placeholder="4c2b2152-4120-417c-a72f-04a6bad1a554"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="surnames">Surnames</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="surnames"
                  defaultValue={surnames}
                  placeholder="Doe"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="given_names">Given Names</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="given_names"
                  defaultValue={given_names}
                  placeholder="Jon"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_birth">Date of Birth</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="date_of_birth"
                  defaultValue={date_of_birth}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="gender_legal">Gender Legal</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="gender_legal"
                  defaultValue={gender_legal}
                  placeholder="Female"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="street_address">Street Address</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="street_address"
                  defaultValue={street_address}
                  placeholder="123 Main St"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="city">City</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="city"
                  defaultValue={city}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="state_province_region">
                  State/Province/Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="state_province_region"
                  defaultValue={state_province_region}
                  maxLength="2"
                  placeholder="ID"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="postalcode">Postal Code</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="postalcode"
                  defaultValue={postalcode}
                  placeholder="83440"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="country">Country</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="country"
                  defaultValue={country}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="phone">Phone</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="phone"
                  defaultValue={phone}
                  placeholder="123-456-7890"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="email">Email</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="email"
                  defaultValue={email}
                  placeholder="name@email.com"
                ></InputFieldModal>
              </InputBox>
              <Actions>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
                <SubmitBtnModal type="submit">Submit</SubmitBtnModal>
              </Actions>
            </form>
          </ModalContent>
        </ModalContentWrapper>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
      </Modal>
    </StyledPopup>
  )
}

export default FormContacts
