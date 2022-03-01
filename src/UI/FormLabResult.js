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

function FormLabResult(props) {
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
          name: 'lab_observation_date_time',
          value:
            Math.floor(
              DateTime.fromISO(form.get('lab_observation_date_time')).ts / 1000
            ).toString() || '',
        },
        {
          name: 'lab_specimen_collected_date',
          value:
            Math.floor(
              DateTime.fromISO(form.get('lab_specimen_collected_date')).ts /
                1000
            ).toString() || '',
        },
        {
          name: 'lab_specimen_type',
          value: form.get('lab_specimen_type') || '',
        },
        {
          name: 'lab_result_status',
          value: form.get('lab_result_status') || '',
        },
        {
          name: 'lab_coding_qualifier',
          value: form.get('lab_coding_qualifier') || '',
        },
        {
          name: 'lab_code',
          value: form.get('lab_code') || '',
        },
        {
          name: 'lab_description',
          value: form.get('lab_description') || '',
        },
        {
          name: 'lab_order_id',
          value: form.get('lab_order_id') || '',
        },
        {
          name: 'lab_normality',
          value: form.get('lab_normality') || '',
        },
        {
          name: 'lab_result',
          value: form.get('lab_result') || '',
        },
        {
          name: 'lab_comment',
          value: form.get('lab_comment') || '',
        },
        {
          name: 'ordering_facility_id',
          value: form.get('ordering_facility_id') || '',
        },
        {
          name: 'ordering_facility_id_qualifier',
          value: form.get('ordering_facility_id_qualifier') || '',
        },
        {
          name: 'ordering_facility_name',
          value: form.get('ordering_facility_name') || '',
        },
        {
          name: 'ordering_facility_state_province_region',
          value: form.get('ordering_facility_state_province_region') || '',
        },
        {
          name: 'ordering_facility_postalcode',
          value: form.get('ordering_facility_postalcode') || '',
        },
        {
          name: 'ordering_facility_country',
          value: form.get('ordering_facility_country') || '',
        },
        {
          name: 'performing_laboratory_id',
          value: form.get('performing_laboratory_id') || '',
        },
        {
          name: 'performing_laboratory_id_qualifier',
          value: form.get('performing_laboratory_id_qualifier') || '',
        },
        {
          name: 'performing_laboratory_name',
          value: form.get('performing_laboratory_name') || '',
        },
        {
          name: 'performing_laboratory_state_province_region',
          value: form.get('performing_laboratory_state_province_region') || '',
        },
        {
          name: 'performing_laboratory_postalcode',
          value: form.get('performing_laboratory_postalcode') || '',
        },
        {
          name: 'performing_laboratory_country',
          value: form.get('performing_laboratory_country') || '',
        },
        {
          name: 'lab_performed_by',
          value: form.get('lab_performed_by') || '',
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

    let schema = props.schemas.SCHEMA_LAB_RESULT
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
        <ModalHeader>Issue Lab Result</ModalHeader>
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
                <ModalLabel htmlFor="lab_observation_date_time">
                  Lab Observation Date/Time
                </ModalLabel>
                <InputFieldModal
                  type="datetime-local"
                  name="lab_observation_date_time"
                  id="lab_observation_date_time"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_specimen_collected_date">
                  Lab Specimen Collected Date
                </ModalLabel>
                <InputFieldModal
                  type="date"
                  name="lab_specimen_collected_date"
                  id="lab_specimen_collected_date"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_specimen_type">
                  Lab Specimen Type
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_specimen_type"
                  id="lab_specimen_type"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_result_status">
                  Lab Result Status
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_result_status"
                  id="lab_result_status"
                  placeholder="F"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_coding_qualifier">
                  Lab Coding Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_coding_qualifier"
                  id="lab_coding_qualifier"
                  placeholder="PRC"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_code">Lab Code</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_code"
                  id="lab_code"
                  placeholder="67890"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_description">
                  Lab Description
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_description"
                  id="lab_description"
                  placeholder="Covid-19 swab test"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_order_id">Lab Order ID</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_order_id"
                  id="lab_order_id"
                  placeholder="12345"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_normality">Lab Normality</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_normality"
                  id="lab_normality"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_result">Lab Result</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_result"
                  id="lab_result"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_comment">Lab Comment</ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_comment"
                  id="lab_comment"
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_id">
                  Order Facility ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="ordering_facility_id"
                  id="ordering_facility_id"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_id_qualifier">
                  Order Facility ID Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="ordering_facility_id_qualifier"
                  id="ordering_facility_id_qualifier"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_name">
                  Order Facility Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="ordering_facility_name"
                  id="ordering_facility_name"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_state_province_region">
                  Ordering Facility State/Province/Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="ordering_facility_state_province_region"
                  id="ordering_facility_state_province_region"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_postalcode">
                  Ordering Facility Postal Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="ordering_facility_postalcode"
                  id="ordering_facility_postalcode"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="ordering_facility_country">
                  Ordering Facility Country
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="ordering_facility_country"
                  id="ordering_facility_country"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_laboratory_id">
                  Performing Laboratory ID
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="performing_laboratory_id"
                  id="performing_laboratory_id"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_laboratory_id_qualifier">
                  Performing Laboratory ID Qualifier
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="performing_laboratory_id_qualifier"
                  id="performing_laboratory_id_qualifier"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_laboratory_name">
                  Performing Laboratory Name
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="performing_laboratory_name"
                  id="performing_laboratory_name"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_laboratory_state_province_region">
                  Performing Laboratory State/Province/Region
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="performing_laboratory_state_province_region"
                  id="performing_laboratory_state_province_region"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_laboratory_state_province_postalcode">
                  Performing Laboratory Postal Code
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="performing_laboratory_state_province_postalcode"
                  id="performing_laboratory_state_province_postalcode"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="performing_laboratory_state_province_country">
                  Performing Laboratory Country
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="performing_laboratory_state_province_country"
                  id="performing_laboratory_state_province_country"
                  placeholder=""
                />
              </InputBox>
              <InputBox>
                <ModalLabel htmlFor="lab_performed_by">
                  Lab Performed By
                </ModalLabel>
                <InputFieldModal
                  type="text"
                  name="lab_performed_by"
                  id="lab_performed_by"
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

export default FormLabResult
