import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { CanUser } from './CanUser'
// import FormExemption from './FormExemption'
import FormContacts from './FormContacts'
// import FormLabOrder from './FormLabOrder'
import FormMedical from './FormMedical'
import FormLabResult from './FormLabResult'
// import FormVaccine from './FormVaccine'
import { useNotification } from './NotificationProvider'
import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'
import { clearNotificationState } from '../redux/notificationsReducer'
import { setContactSelected } from '../redux/contactsReducer'

import {
  DataTable,
  DataRow,
  DataHeader,
  DataCell,
  AttributeTable,
  AttributeRow,
} from './CommonStylesTables'

const EditContact = styled.button`
  float: right;
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};
`

const IssueCredential = styled.button`
  float: right;
  padding: 10px;
  color: ${(props) => props.theme.text_light};
  border: none;
  box-shadow: ${(props) => props.theme.drop_shadow};
  background: ${(props) => props.theme.primary_color};
`

function Contact(props) {
  const dispatch = useDispatch()
  const contactsState = useSelector((state) => state.contacts)
  const credentialsState = useSelector((state) => state.credentials)
  const notificationsState = useSelector((state) => state.notifications)

  const contacts = contactsState.contacts
  const credentials = credentialsState.credentials
  const contactSelected = contactsState.contactSelected
  const error = notificationsState.errorMessage
  const success = notificationsState.successMessage
  const warning = notificationsState.warningMessage

  const history = props.history
  const contactId = props.contactId

  // Accessing notification context
  const setNotification = useNotification()

  let contactToSelect = ''

  // const [index, setIndex] = useState(false)

  // Contact form customization (no contact search dropdown)
  // const [contactSearch, setContactSearch] = useState(false)

  // Modal state
  const [contactModalIsOpen, setContactModalIsOpen] = useState(false)
  // const [exemptionModalIsOpen, setExemptionModalIsOpen] = useState(false)
  // const [labOrderModalIsOpen, setLabOrderModalIsOpen] = useState(false)
  const [labResultModalIsOpen, setLabResultModalIsOpen] = useState(false)
  // const [vaccineModalIsOpen, setVaccineModalIsOpen] = useState(false)
  const [medicalModalIsOpen, setMedicalModalIsOpen] = useState(false)

  const closeContactModal = () => setContactModalIsOpen(false)
  // const closeExemptionModal = () => setExemptionModalIsOpen(false)
  // const closeLabOrderModal = () => setLabOrderModalIsOpen(false)
  const closeLabResultModal = () => setLabResultModalIsOpen(false)
  // const closeVaccineModal = () => setVaccineModalIsOpen(false)
  const closeMedicalModal = () => setMedicalModalIsOpen(false)

  if (contacts) {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].contact_id === Number(contactId)) {
        contactToSelect = contacts[i]
        break
      }
    }
  }

  useEffect(() => {
    if (success) {
      setNotification(success, 'notice')
      dispatch(clearNotificationState())
    } else if (error) {
      setNotification(error, 'error')
      dispatch(clearNotificationState())
      // setIndex(i => i + 1)
    } else if (warning) {
      setNotification(warning, 'warning')
      dispatch(clearNotificationState())
      // setIndex(i => i + 1)
    } else return
  }, [error, success, warning])

  useEffect(() => {
    dispatch(setContactSelected(contactToSelect))
  }, [contactToSelect])

  function updateDemographics(updatedDemographic, e) {
    e.preventDefault()
    const Demographic = {
      Demographic: { ...updatedDemographic },
    }

    props.sendRequest('DEMOGRAPHICS', 'UPDATE_OR_CREATE', updatedDemographic)

    setNotification('Contact was updated!', 'notice')

    dispatch(setContactSelected({ ...contactSelected, ...Demographic }))
  }

  function openCredential(history, id) {
    if (history !== undefined) {
      history.push('/credentials/' + id)
    }
  }

  // Submits the credential form and shows notification
  function submitNewCredential(newCredential, e) {
    e.preventDefault()

    props.sendRequest('CREDENTIALS', 'ISSUE_USING_SCHEMA', newCredential)
  }
  // Submits the credential form and shows notification
  function sendBasicMessage(e) {
    e.preventDefault()
    props.sendRequest('TEST_ATOMIC_FUNCTIONS', 'SEND_BASIC_MESSAGE', {
      connection_id: contactSelected.Connections[0].connection_id,
    })
  }

  function askQuestion(e) {
    e.preventDefault()
    props.sendRequest('TEST_ATOMIC_FUNCTIONS', 'ASK_QUESTION', {
      connection_id: contactSelected.Connections[0].connection_id,
    })
  }

  function requestDemographics(e) {
    e.preventDefault()
    props.sendRequest('TEST_ATOMIC_FUNCTIONS', 'REQUEST_DEMOGRAPHICS', {
      connection_id: contactSelected.Connections[0].connection_id,
    })
  }

  function requestMedicalRelease(e) {
    e.preventDefault()
    props.sendRequest('TEST_ATOMIC_FUNCTIONS', 'REQUEST_MEDICAL_RELEASE', {
      connection_id: contactSelected.Connections[0].connection_id,
    })
  }

  const credentialRows = credentials.map((credential_record) => {
    if (
      contactSelected.Connections &&
      contactSelected.Connections[0].connection_id ===
        credential_record.connection_id
    ) {
      const credential_id = credential_record.credential_exchange_id
      const credentialState = credential_record.state.replaceAll('_', ' ') || ''
      const dateCreated =
        new Date(credential_record.created_at).toLocaleString() || ''

      let credentialName = ''
      if (
        credential_record.credential_proposal_dict !== null &&
        credential_record.credential_proposal_dict !== undefined
      ) {
        credentialName = credential_record.credential_proposal_dict.schema_name.replaceAll(
          '_',
          ' '
        )
      }
      return (
        <DataRow
          key={credential_id}
          onClick={() => {
            openCredential(history, credential_id)
          }}
        >
          <DataCell>{credentialName}</DataCell>
          <DataCell className="title-case">{credentialState}</DataCell>
          <DataCell>{dateCreated}</DataCell>
        </DataRow>
      )
    } else {
      return null
    }
  })

  return (
    <>
      <div id="contact">
        <PageHeader
          title={'Contact Details: ' + (contactSelected.label || '')}
        />
        <PageSection>
          <CanUser
            perform="contacts:update"
            yes={() => (
              <EditContact onClick={() => setContactModalIsOpen((o) => !o)}>
                Edit
              </EditContact>
            )}
          />
          <h2>General Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Contact ID:</th>
                <td>{contactSelected.contact_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Connection Status:</th>
                <td>
                  {contactSelected.Connections !== undefined
                    ? contactSelected.Connections[0].state || ''
                    : ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>

          <h2>Demographic Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Contact Label:</th>
                <td>{contactSelected.label || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Medical Release ID:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.medical_release_id || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Surname(s):</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.surnames || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Given Name(s):</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.given_names || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Date of Birth:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.date_of_birth.split('T')[0] ||
                      ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Gender Legal:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.gender_legal || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Street Address:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.street_address || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>City:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.city || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>State/Province/Region:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.state_province_region || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Postal Code:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.postalcode || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Country:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.country || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Phone:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.phone || ''
                    : ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Email:</th>
                <td>
                  {contactSelected.Demographic !== null &&
                  contactSelected.Demographic !== undefined
                    ? contactSelected.Demographic.email || ''
                    : ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
        </PageSection>
        <PageSection>
          <CanUser
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={
                  () =>
                    // privileges && privileges.includes('issue_lab_result')
                    //   ?
                    setLabResultModalIsOpen((o) => !o)
                  // : setNotification(
                  //     "Error: you don't have the right privileges",
                  //     'error'
                  //   )
                }
              >
                Issue Lab Result Credential
              </IssueCredential>
            )}
          />

          <IssueCredential onClick={sendBasicMessage}>
            Send Basic Message
          </IssueCredential>
          <IssueCredential onClick={askQuestion}>Ask Question</IssueCredential>
          <IssueCredential onClick={requestDemographics}>
            Request Demographics
          </IssueCredential>
          <CanUser
            perform="credentials:issue"
            yes={() => (
              <IssueCredential onClick={() => setMedicalModalIsOpen((o) => !o)}>
                Issue Medical Release Credential
              </IssueCredential>
            )}
          />
          <IssueCredential onClick={requestMedicalRelease}>
            Request Medical Release
          </IssueCredential>

          {/* <CanUser
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_lab_order')
                    ? setLabOrderModalIsOpen((o) => !o)
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Lab Order Credential
              </IssueCredential>
            )}
          />
          <CanUser
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_vaccine')
                    ? setVaccineModalIsOpen((o) => !o)
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Vaccine Credential
              </IssueCredential>
            )}
          />
          <CanUser
            perform="credentials:issue"
            yes={() => (
              <IssueCredential
                onClick={() =>
                  privileges && privileges.includes('issue_vaccine_exemption')
                    ? setExemptionModalIsOpen((o) => !o)
                    : setNotification(
                        "Error: you don't have the right privileges",
                        'error'
                      )
                }
              >
                Issue Vaccine Exemption Credential
              </IssueCredential>
            )}
          />
          <CanUser
            perform="credentials:issue"
            yes={() => (
              <IssueCredential onClick={() => setMedicalModalIsOpen((o) => !o)}>
                Issue Medical Release Credential
              </IssueCredential>
            )}
          /> */}
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Credential</DataHeader>
                <DataHeader>Status</DataHeader>
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{credentialRows}</tbody>
          </DataTable>
        </PageSection>

        <FormContacts
          contactModalIsOpen={contactModalIsOpen}
          closeContactModal={closeContactModal}
          submitDemographics={updateDemographics}
        />

        {/* <FormLabOrder
          credentialModalIsOpen={labOrderModalIsOpen}
          closeCredentialModal={closeLabOrderModal}
          submitCredential={submitNewCredential}          
        /> */}
        <FormLabResult
          credentialModalIsOpen={labResultModalIsOpen}
          closeCredentialModal={closeLabResultModal}
          submitCredential={submitNewCredential}
        />
        {/* <FormVaccine
          credentialModalIsOpen={vaccineModalIsOpen}
          closeCredentialModal={closeVaccineModal}
          submitCredential={submitNewCredential}         
        />
        <FormExemption
          credentialModalIsOpen={exemptionModalIsOpen}
          closeCredentialModal={closeExemptionModal}
          submitCredential={submitNewCredential}          
        /> */}
        <FormMedical
          credentialModalIsOpen={medicalModalIsOpen}
          closeCredentialModal={closeMedicalModal}
          submitCredential={submitNewCredential}
        />
      </div>
    </>
  )
}

export default Contact
