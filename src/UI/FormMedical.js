import React, { useRef } from 'react'

import {
  StyledPopup,
  InputBox,
  Modal,
  ModalHeader,
  ModalContentWrapper,
  ModalContent,
  CloseBtn,
  Actions,
  CancelBtn,
  SubmitBtnModal,
  ModalLabel,
  InputFieldModal,
  TextItem,
} from './CommonStylesForms'

function FormMedical(props) {
  const credentialForm = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(credentialForm.current)

    let attributes = [
      {
        name: 'mpid',
        value: form.get('mpid') || '',
      },
      {
        name: 'patient_local_id',
        value: form.get('patient_local_id') || '',
      },
      {
        name: 'patient_surnames',
        value: form.get('patient_surnames') || '',
      },
      {
        name: 'patient_given_names',
        value: form.get('patient_given_names') || '',
      },
      {
        name: 'patient_date_of_birth',
        value: form.get('patient_date_of_birth') || '',
      },
      {
        name: 'patient_gender_legal',
        value: form.get('patient_gender_legal') || '',
      },
      {
        name: 'patient_street_address',
        value: form.get('patient_street_address') || '',
      },
      {
        name: 'patient_city',
        value: form.get('patient_city') || '',
      },
      {
        name: 'patient_state_province_region',
        value: form.get('patient_state_province_region') || '',
      },
      {
        name: 'patient_postalcode',
        value: form.get('patient_postalcode') || '',
      },
      {
        name: 'patient_country',
        value: form.get('patient_country') || '',
      },
      {
        name: 'patient_phone',
        value: form.get('patient_phone') || '',
      },
      {
        name: 'patient_email',
        value: form.get('patient_email') || '',
      },
      {
        name: 'medical_release_id',
        value: form.get('medical_release_id') || '',
      },
      {
        name: 'medical_release_signed_date',
        value: form.get('medical_release_signed_date') || '',
      },
      {
        name: 'medical_release_form_location',
        value: form.get('medical_release_form_location') || '',
      },
      {
        name: 'medical_release_covered_data',
        value: form.get('medical_release_covered_data') || '',
      },
      {
        name: 'medical_release_covered_party',
        value: form.get('medical_release_covered_party') || '',
      },
      {
        name: 'medical_release_purposes',
        value: form.get('medical_release_purposes') || '',
      },
      {
        name: 'medical_release_requestor',
        value: form.get('medical_release_requestor') || '',
      },
      {
        name: 'medical_release_requestor_relationship',
        value: form.get('medical_release_requestor_relationship') || '',
      },
      {
        name: 'credential_issuer_name',
        value: form.get('credential_issuer_name') || '',
      },
      {
        name: 'credential_issue_date',
        value: form.get('credential_issue_date') || '',
      },
    ]

    let newCredential = {
      connectionID: props.contactSelected.Connections[0].connection_id,
      schemaID: 'RuuJwd3JMffNwZ43DcJKN1:2:Medical_Release:1.1',
      schemaVersion: '1.1',
      schemaName: 'Medical_Release',
      schemaIssuerDID: 'RuuJwd3JMffNwZ43DcJKN1',
      comment: 'Medical Release',
      attributes: attributes,
    }

    props.submitCredential(newCredential, e)
    props.closeCredentialModal()
  }

  function closeModal() {
    props.closeCredentialModal()
  }

  return (
    <StyledPopup
      open={props.credentialModalIsOpen}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <Modal className="modal">
        <ModalHeader>Issue Medical Release Credential</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form onSubmit={handleSubmit} ref={credentialForm}>
              <InputBox>
                <ModalLabel htmlFor="mpid">MPID</ModalLabel>
                <InputFieldModal type="text" name="mpid" id="type" />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_local_id">
                  Patient Local ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_local_id"
                  id="patient_local_id"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_surnames">
                  Patient Surnames
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_surnames"
                  id="patient_surnames"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_given_names">
                  Patient Given Names
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_given_names"
                  id="patient_given_names"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_date_of_birth">
                  Patient Date of Birth
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="patient_date_of_birth"
                  id="patient_date_of_birth"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_gender_legal">
                  Patient Gender Legal
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_gender_legal"
                  id="patient_gender_legal"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_street_address">
                  Patient Street Address
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_street_address"
                  id="patient_street_address"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_city">Patient City</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_city"
                  id="patient_city"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_state_province_region">
                  Patient State / Province / Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_state_province_region"
                  id="patient_state_province_region"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_postalcode">
                  Patient Postalcode
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_postalcode"
                  id="patient_postalcode"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_country">
                  Patient Country
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_country"
                  id="patient_country"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_phone">Patient Phone</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_phone"
                  id="patient_phone"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_email">Patient Email</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_email"
                  id="patient_email"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_id">
                  Medical Release ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_id"
                  id="medical_release_id"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_signed_date">
                  Medical Release Signed Date
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="medical_release_signed_date"
                  id="medical_release_signed_date"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_form_location">
                  Medical Release Form Location
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_form_location"
                  id="medical_release_form_location"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_covered_data">
                  Medical Release Covered Data
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_covered_data"
                  id="medical_release_covered_data"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_covered_party">
                  Medical Release Covered Party
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_covered_party"
                  id="medical_release_covered_party"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_purposes">
                  Medical Release Purposes
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_purposes"
                  id="medical_release_purposes"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_requestor">
                  Medical Release Requestor
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_requestor"
                  id="medical_release_requestor"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="medical_release_requestor_relationship">
                  Medical Release Requestor Relationship
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="medical_release_requestor_relationship"
                  id="medical_release_requestor_relationship"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="credential_issuer_name">
                  Credential Issuer Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="credential_issuer_name"
                  id="credential_issuer_name"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="credential_issue_date">
                  Credential Issue Date
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="credential_issue_date"
                  id="credential_issue_date"
                />
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

export default FormMedical
