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
  const email =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.email))
      : ''
  const phone =
    props.contactSelected && props.contactSelected.Demographic
      ? JSON.parse(JSON.stringify(props.contactSelected.Demographic.phone))
      : ''
  const address_1 =
    props.contactSelected &&
    props.contactSelected.Demographic &&
    props.contactSelected.Demographic.address
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.address.address_1)
        )
      : ''
  const address_2 =
    props.contactSelected &&
    props.contactSelected.Demographic &&
    props.contactSelected.Demographic.address
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.address.address_2)
        )
      : ''
  const city =
    props.contactSelected &&
    props.contactSelected.Demographic &&
    props.contactSelected.Demographic.address
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.address.city)
        )
      : ''
  const state =
    props.contactSelected &&
    props.contactSelected.Demographic &&
    props.contactSelected.Demographic.address
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.address.state)
        )
      : ''
  const zip_code =
    props.contactSelected &&
    props.contactSelected.Demographic &&
    props.contactSelected.Demographic.address
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.address.zip_code)
        )
      : ''
  const country =
    props.contactSelected &&
    props.contactSelected.Demographic &&
    props.contactSelected.Demographic.address
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Demographic.address.country)
        )
      : ''
  const passport_number =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.passport_number)
        )
      : ''
  const surname =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.surname))
      : ''
  const given_names =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.given_names))
      : ''
  const sex =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.sex))
      : ''
  const date_of_birth =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.date_of_birth.split('T')[0]
          )
        )
      : ''
  const place_of_birth =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(props.contactSelected.Passport.place_of_birth)
        )
      : ''
  const nationality =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.nationality))
      : ''
  const date_of_issue =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.date_of_issue.split('T')[0]
          )
        )
      : ''
  const date_of_expiration =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(
          JSON.stringify(
            props.contactSelected.Passport.date_of_expiration.split('T')[0]
          )
        )
      : ''
  const type =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.type))
      : ''
  const code =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.code))
      : ''
  const authority =
    props.contactSelected && props.contactSelected.Passport
      ? JSON.parse(JSON.stringify(props.contactSelected.Passport.authority))
      : ''

  const contactForm = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(contactForm.current)

    // Assembling demographics JSON
    const demographics = {}
    demographics.contact_id = props.contactSelected.contact_id
    demographics.email = form.get('email')
    demographics.phone = form.get('phone')
    demographics.address = {}
    demographics.address.address_1 = form.get('address_1')
    demographics.address.address_2 = form.get('address_2')
    demographics.address.city = form.get('city')
    demographics.address.state = form.get('state')
    demographics.address.zip_code = form.get('zip_code')
    demographics.address.country = form.get('country')

    props.submitDemographics(demographics, e)

    const passport = {}
    passport.contact_id = props.contactSelected.contact_id
    passport.passport_number = form.get('passport_number')
    passport.surname = form.get('surname')
    passport.given_names = form.get('given_names')
    passport.sex = form.get('sex')
    passport.date_of_birth = form.get('date_of_birth')
    passport.place_of_birth = form.get('place_of_birth')
    passport.nationality = form.get('nationality')
    passport.date_of_issue = form.get('date_of_issue')
    passport.date_of_expiration = form.get('date_of_expiration')
    passport.type = form.get('type')
    passport.code = form.get('code')
    passport.authority = form.get('authority')
    passport.photo = props.contactSelected.Passport
      ? props.contactSelected.Passport.photo.data
      : ''

    props.submitPassport(passport, e)

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
                <ModalLabel htmlFor="email">Email</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="email"
                  defaultValue={email}
                  placeholder="name@email.com"
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
                <ModalLabel htmlFor="address_1">Address 1</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="address_1"
                  defaultValue={address_1}
                  placeholder="123 Main St"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="address_2">Address 2</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="address_2"
                  defaultValue={address_2}
                  placeholder="Apt. #382"
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
                <ModalLabel htmlFor="state">State</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="state"
                  defaultValue={state}
                  maxLength="2"
                  placeholder="ID"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="zip_code">Zip Code</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="zip_code"
                  defaultValue={zip_code}
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
                <ModalLabel htmlFor="contact_id"></ModalLabel>
                <InputFieldModal
                  type="hidden"
                  name="contact_id"
                  defaultValue={contact_id}
                ></InputFieldModal>
              </InputBox>
              <ModalSubHeader>Passport</ModalSubHeader>
              <InputBox>
                <ModalLabel htmlFor="passport_number">
                  Passport Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="passport_number"
                  defaultValue={passport_number}
                  placeholder="444561807"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="surname">Surname</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="surname"
                  defaultValue={surname}
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
                <ModalLabel htmlFor="sex">Official Gender</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="sex"
                  defaultValue={sex}
                  placeholder="Female"
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
                <ModalLabel htmlFor="place_of_birth">Place of Birth</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="place_of_birth"
                  defaultValue={place_of_birth}
                  placeholder="San Diego"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="nationality">Nationality</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="nationality"
                  defaultValue={nationality}
                  placeholder="United States of America"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_issue">Date of Issue</ModalLabel>
                <InputFieldModal
                  type="date"
                  name="date_of_issue"
                  defaultValue={date_of_issue}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="date_of_expiration">
                  Date of Expiration
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="date_of_expiration"
                  defaultValue={date_of_expiration}
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="type">Type</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="type"
                  defaultValue={type}
                  placeholder="P"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="code">Code</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="code"
                  defaultValue={code}
                  placeholder="USA"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="authority">Authority</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="authority"
                  defaultValue={authority}
                  placeholder="United States Department of State"
                ></InputFieldModal>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="contact_id"></ModalLabel>
                <InputFieldModal
                  type="hidden"
                  name="contact_id"
                  defaultValue={contact_id}
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
