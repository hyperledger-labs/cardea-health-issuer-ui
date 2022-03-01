import React, { useRef } from 'react'

import { DateTime } from 'luxon'

import { useNotification } from './NotificationProvider'

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

function FormExemption(props) {
  const credentialForm = useRef(null)
  const setNotification = useNotification()

  const surnames =
    props.contactSelected && props.contactSelected.Demographic
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
          JSON.stringify(props.contactSelected.Demographic.date_of_birth)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(credentialForm.current)

    let attributes = {}
    if (props.contactSelected && props.contactSelected.Demographic) {
      const demographics = props.contactSelected.Demographic

      attributes = [
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
          value: demographics.surnames || '',
        },
        {
          name: 'patient_given_names',
          value: demographics.given_names || '',
        },
        {
          name: 'patient_date_of_birth',
          value:
            Math.floor(
              DateTime.fromISO(form.get(demographics.date_of_birth)).ts / 1000
            ).toString() || '',
        },
        {
          name: 'patient_gender_legal',
          value: demographics.gender_legal || '',
        },
        {
          name: 'patient_street_address',
          value: demographics.street_address || '',
        },
        {
          name: 'patient_city',
          value: demographics.city || '',
        },
        {
          name: 'patient_state_province_region',
          value: demographics.state_province_region || '',
        },
        {
          name: 'patient_postalcode',
          value: demographics.postalcode || '',
        },
        {
          name: 'patient_country',
          value: demographics.country || '',
        },
        {
          name: 'patient_phone',
          value: demographics.phone || '',
        },
        {
          name: 'patient_email',
          value: demographics.email || '',
        },
        {
          name: 'exemption_record_id',
          value: form.get('exemption_record_id') || '',
        },
        {
          name: 'exemption_requestor',
          value: form.get('exemption_requestor') || '',
        },
        {
          name: 'exemption_requestor_relationship',
          value: form.get('exemption_requestor_relationship') || '',
        },
        {
          name: 'exemption_issue_date',
          value:
            Math.floor(
              DateTime.fromISO(form.get('exemption_issue_date')).ts / 1000
            ).toString() || '',
        },
        {
          name: 'exemption_state_province_region',
          value: form.get('exemption_state_province_region') || '',
        },
        {
          name: 'exemption_country',
          value: form.get('exemption_country') || '',
        },
        {
          name: 'exemption_type',
          value: form.get('exemption_type') || '',
        },
        {
          name: 'exemption_medical_permanent',
          value: form.get('exemption_medical_permanent') || '',
        },
        {
          name: 'exemption_note',
          value: form.get('exemption_note') || '',
        },
        {
          name: 'exemption_from_all',
          value: form.get('exemption_from_all') || '',
        },
        {
          name: 'exemption_diseases_code',
          value: form.get('exemption_diseases_code') || '',
        },
        {
          name: 'exemption_disease_code_qualifier',
          value: form.get('exemption_disease_code_qualifier') || '',
        },
        {
          name: 'exemption_disease_code_name',
          value: form.get('exemption_disease_code_name') || '',
        },
        {
          name: 'exemption_medical_physician_surnames',
          value: form.get('exemption_medical_physician_surnames') || '',
        },
        {
          name: 'exemption_medical_physician_given_names',
          value: form.get('exemption_medical_physician_given_names') || '',
        },
        {
          name: 'exemption_medical_physician_full_name',
          value: form.get('exemption_medical_physician_full_name') || '',
        },
        {
          name: 'exemption_medical_physician_license_number',
          value: form.get('exemption_medical_physician_license_number') || '',
        },
        {
          name: 'exemption_medical_physician_license_type',
          value: form.get('exemption_medical_physician_license_type') || '',
        },
        {
          name: 'exemption_medical_physician_license_state_province_region',
          value:
            form.get(
              'exemption_medical_physician_license_state_province_region'
            ) || '',
        },
        {
          name: 'exemption_medical_physician_license_country',
          value: form.get('exemption_medical_physician_license_country') || '',
        },
        {
          name: 'exemption_expiration_date',
          value:
            Math.floor(
              DateTime.fromISO(form.get('exemption_expiration_date')).ts / 1000
            ).toString() || '',
        },
        {
          name: 'exemption_credential_issuer',
          value: form.get('exemption_credential_issuer') || '',
        },
        {
          name: 'certificate_original_issuer',
          value: form.get('certificate_original_issuer') || '',
        },
        {
          name: 'certificate_original_identifier',
          value: form.get('certificate_original_identifier') || '',
        },
        {
          name: 'credential_issuer_name',
          value: form.get('credential_issuer_name') || '',
        },
        {
          name: 'credential_issue_date',
          value:
            Math.floor(
              DateTime.fromISO(form.get('credential_issue_date')).ts / 1000
            ).toString() || '',
        },
      ]
    } else {
      return setNotification(
        'Please "Edit" the Contact to Provide Demographic Information.',
        'error'
      )
    }
    let schema = props.schemas.SCHEMA_VACCINE_EXEMPTION
    let schemaParts = schema.split(':')

    let newCredential = {
      connectionID: props.contactSelected.Connections[0].connection_id,
      schemaID: schema,
      schemaVersion: schemaParts[3],
      schemaName: schemaParts[2],
      schemaIssuerDID: schemaParts[0],
      comment: form.get('comment'),
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
        <ModalHeader>Issue Vaccine Exemption</ModalHeader>
        <ModalContentWrapper>
          <ModalContent>
            <form onSubmit={handleSubmit} ref={credentialForm}>
              <InputBox>
                <ModalLabel htmlFor="mpid">MPID</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="mpid"
                  id="mpid"
                  placeholder="12345"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_local_id">
                  Patient Local ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="patient_local_id"
                  id="patient_local_id"
                  placeholder="685744"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_surnames">
                  Patient Surnames
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_surnames"
                  id="patient_surnames"
                >
                  {surnames}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_given_names">
                  Patient Given Names
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_given_names"
                  id="patient_given_names"
                >
                  {given_names}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_date_of_birth">
                  Patient Date of Birth
                </ModalLabel>
                <TextItem
                  type="date"
                  name="patient_date_of_birth"
                  id="patient_date_of_birth"
                >
                  {date_of_birth}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_gender_legal">
                  Patient Gender Legal
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_gender_legal"
                  id="patient_gender_legal"
                >
                  {gender_legal}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_street_address">
                  Patient Street Address
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_street_address"
                  id="patient_street_address"
                >
                  {street_address}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_city">Patient City</ModalLabel>
                <TextItem type="text" name="patient_city" id="patient_city">
                  {city}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_state_province_region">
                  Patient State/Province/Region{' '}
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_state_province_region"
                  id="patient_state_province_region"
                >
                  {state_province_region}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_postalcode">
                  Patient Postal Code
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_postalcode"
                  id="patient_postalcode"
                >
                  {postalcode}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_country">
                  Patient Country
                </ModalLabel>
                <TextItem
                  type="text"
                  name="patient_country"
                  id="patient_country"
                >
                  {country}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_phone">Patient Phone</ModalLabel>
                <TextItem
                  type="numeric"
                  name="patient_phone"
                  id="patient_phone"
                >
                  {phone}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="patient_email">Patient Email</ModalLabel>
                <TextItem type="text" name="patient_email" id="patient_email">
                  {email}
                </TextItem>
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_record_id">
                  Exemption Record ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_record_id"
                  id="exemption_record_id"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_requestor">
                  Exemption Requestor
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_requestor"
                  id="exemption_requestor"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_requestor_relationship">
                  Exemption Requestor Relationship
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_requestor_relationship"
                  id="exemption_requestor_relationship"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_issue_date">
                  Exemption Issue Date
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="exemption_issue_date"
                  id="exemption_issue_date"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_state_province_region">
                  Exemption State/Province/Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_state_province_region"
                  id="exemption_state_province_region"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_country">
                  Exemption Country
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_country"
                  id="exemption_country"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_type">Exemption Type</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_type"
                  id="exemption_type"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_permanent">
                  Exemption Medical Permanent
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_permanent"
                  id="exemption_medical_permanent"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_note">Exemption Note</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_note"
                  id="exemption_note"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_from_all">
                  Exemption From All
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_from_all"
                  id="exemption_from_all"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_disease_code">
                  Exemption Disease Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_disease_code"
                  id="exemption_disease_code"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_disease_code_qualifier">
                  Exemption Disease Code Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_disease_code_qualifier"
                  id="exemption_disease_code_qualifier"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_disease_code_name">
                  Exemption Disease Code Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_disease_code_name"
                  id="exemption_disease_code_name"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_surnames">
                  Exemption Medical Physician Surnames
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_surnames"
                  id="exemption_medical_physician_surnames"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_given_names">
                  Exemption Medical Physician Given Names
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_given_names"
                  id="exemption_medical_physician_given_names"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_full_name">
                  Exemption Medical Physician Full Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_full_name"
                  id="exemption_medical_physician_full_name"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_license_number">
                  Exemption Medical Physician License Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_license_number"
                  id="exemption_medical_physician_license_number"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_license_type">
                  Exemption Medical Physician License Type
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_license_type"
                  id="exemption_medical_physician_license_type"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_license_state_province_region">
                  Exemption Medical Physician License State/Province/Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_license_state_province_region"
                  id="exemption_medical_physician_license_state_province_region"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_medical_physician_license_country">
                  Exemption Medical Physician License Country
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_medical_physician_license_country"
                  id="exemption_medical_physician_license_country"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_expiration_date">
                  Exemption Expiration Date
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="exemption_expiration_date"
                  id="exemption_expiration_date"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="exemption_credential_issuer">
                  Exemption Credential Issuer
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="exemption_credential_issuer"
                  id="exemption_credential_issuer"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="certificate_original_issuer">
                  Certificate Original Issuer
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="certificate_original_issuer"
                  id="certificate_original_issuer"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="certificate_original_identifier">
                  Certificate Original Identifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="certificate_original_identifier"
                  id="certificate_original_identifier"
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
              <InputBox>
                <ModalLabel htmlFor="comment">Comment</ModalLabel>
                <InputFieldModal type="text" name="comment" id="comment" />
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

export default FormExemption
