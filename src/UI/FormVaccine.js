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

function FormVaccine(props) {
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
          name: 'sending_facility',
          value: form.get('sending_facility') || '',
        },
        {
          name: 'vaccine_record_id',
          value: form.get('vaccine_record_id') || '',
        },
        {
          name: 'vaccine_administration_facility_id',
          value: form.get('vaccine_administration_facility_id') || '',
        },
        {
          name: 'vaccine_administration_facility_id_qualifier',
          value: form.get('vaccine_administration_facility_id_qualifier') || '',
        },
        {
          name: 'vaccine_administration_facility_name',
          value: form.get('vaccine_administration_facility_name') || '',
        },
        {
          name: 'vaccine_administration_state_province_region',
          value: form.get('vaccine_administration_state_province_region') || '',
        },
        {
          name: 'vaccine_administration_postalcode',
          value: form.get('vaccine_administration_postalcode') || '',
        },
        {
          name: 'vaccine_administration_country',
          value: form.get('vaccine_administration_country') || '',
        },
        {
          name: 'vaccine_administration_date',
          value:
            Math.floor(
              DateTime.fromISO(form.get('vaccine_administration_date')).ts /
                1000
            ).toString() || '',
        },
        {
          name: 'vaccine_dose_number',
          value: form.get('vaccine_dose_number') || '',
        },
        {
          name: 'vaccine_series_complete',
          value: form.get('vaccine_series_complete') || '',
        },
        {
          name: 'vaccine_lot_number',
          value: form.get('vaccine_lot_number') || '',
        },
        {
          name: 'vaccine_code',
          value: form.get('vaccine_code') || '',
        },
        {
          name: 'vaccine_code_qualifier',
          value: form.get('vaccine_code_qualifier') || '',
        },
        {
          name: 'vaccine_code_name',
          value: form.get('vaccine_code_name') || '',
        },
        {
          name: 'vaccine_manufacturer_code',
          value: form.get('vaccine_manufacturer_code') || '',
        },
        {
          name: 'vaccine_manufacturer_code_qualifier',
          value: form.get('vaccine_manufacturer_code_qualifier') || '',
        },
        {
          name: 'vaccine_manufacturer_code_name',
          value: form.get('vaccine_manufacturer_code_name') || '',
        },
        {
          name: 'vaccine_disease_target_code',
          value: form.get('vaccine_disease_target_code') || '',
        },
        {
          name: 'vaccine_disease_target_code_qualifier',
          value: form.get('vaccine_disease_target_code_qualifier') || '',
        },
        {
          name: 'vaccine_disease_target_name',
          value: form.get('vaccine_disease_target_name') || '',
        },
        {
          name: 'vaccine_administration_provider_id',
          value: form.get('vaccine_administration_provider_id') || '',
        },
        {
          name: 'vaccine_administration_provider_id_qualifier',
          value: form.get('vaccine_administration_provider_id_qualifier') || '',
        },
        {
          name: 'vaccine_administration_provider_fullname',
          value: form.get('vaccine_administration_provider_fullname') || '',
        },
        {
          name: 'vaccine_education_reference_material',
          value: form.get('vaccine_education_reference_material') || '',
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
    let schema = props.schemas.SCHEMA_VACCINATION
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
        <ModalHeader>Issue Vaccine</ModalHeader>
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
                <ModalLabel htmlFor="sending_facility">
                  Sending Facility
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="sending_facility"
                  id="sending_facility"
                  placeholder=""
                  defaultValue=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_record_id">
                  Vaccine Record ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_record_id"
                  id="vaccine_record_id"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_facility_id">
                  Vaccine Administration Facility ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_facility_id"
                  id="vaccine_administration_facility_id"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_facility_id_qualifier">
                  Vaccine Administration Facility ID Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_facility_id_qualifier"
                  id="vaccine_administration_facility_id_qualifier"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_facility_name">
                  Vaccine Administration Facility Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_facility_name"
                  id="vaccine_administration_facility_name"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_state_province_region">
                  Vaccine Administration State/Province/Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_state_province_region"
                  id="vaccine_administration_state_province_region"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_postalcode">
                  Vaccine Adminstration Postal Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_postalcode"
                  id="vaccine_administration_postalcode"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_country">
                  Vaccine Administration Country
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_country"
                  id="vaccine_administration_country"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_date">
                  Vaccine Administration Date
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="vaccine_administration_date"
                  id="vaccine_administration_date"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_dose_number">
                  Vaccine Dose Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_dose_number"
                  id="vaccine_dose_number"
                  placeholder="67890"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_series_complete">
                  Vaccine Series Complete
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_series_complete"
                  id="vaccine_series_complete"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_lot_number">
                  Vaccine Lot Number
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_lot_number"
                  id="vaccine_lot_number"
                  placeholder="12345"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_code">Vaccine Code</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_code"
                  id="vaccine_code"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_code_qualifier">
                  Vaccine Code Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_code_qualifier"
                  id="vaccine_code_qualifier"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_code_name">
                  Vaccine Code Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_code_name"
                  id="vaccine_code_name"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_manufacturer_code">
                  Vaccine Manufacturer Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_manufacturer_code"
                  id="vaccine_manufacturer_code"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_manufacturer_code_qualifier">
                  Vaccine Manufacturer Code Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_manufacturer_code_qualifier"
                  id="vaccine_manufacturer_code_qualifier"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_manufacturer_code_name">
                  Vaccine Manufacturer Code Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_manufacturer_code_name"
                  id="vaccine_manufacturer_code_name"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_disease_target_code">
                  Vaccine Disease Target Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_disease_target_code"
                  id="vaccine_disease_target_code"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_disease_target_code_qualifier">
                  Vaccine Disease Target Code Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_disease_target_code_qualifier"
                  id="vaccine_disease_target_code_qualifier"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_disease_target_name">
                  Vaccine Disease Target Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_disease_target_name"
                  id="vaccine_disease_target_name"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_provider_id">
                  Vaccine Administration Provider ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_provider_id"
                  id="vaccine_administration_provider_id"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_provider_id_qualifier">
                  Vaccine Administration Provider ID Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_provider_id_qualifier"
                  id="vaccine_administration_provider_id_qualifier"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_administration_provider_fullname">
                  Vaccine Administration Provider Full Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_administration_provider_fullname"
                  id="vaccine_administration_provider_fullname"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="vaccine_education_reference_material">
                  Vaccine Education Reference Material
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="vaccine_education_reference_material"
                  id="vaccine_education_reference_material"
                  placeholder=""
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
                  placeholder=""
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
                  placeholder=""
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
                  placeholder=""
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
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="comment">Comment</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder=""
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

export default FormVaccine
