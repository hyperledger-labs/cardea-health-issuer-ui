import React, { useEffect } from 'react'

import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'

import { AttributeTable, AttributeRow } from './CommonStylesTables'

import { DateTime } from 'luxon'

function Presentation(props) {
  const contacts = props.contacts
  const presentationId = props.presentation
  const presentationReports = props.presentationReports

  let presentationSelected = ''

  for (let i = 0; i < presentationReports.length; i++) {
    if (presentationReports[i].presentation_exchange_id === presentationId) {
      presentationSelected = presentationReports[i]
      break
    }
  }

  // (AmmonBurgi) Find connection and give the selected presentation a contact_label.
  for (let i = 0; i < contacts.length; i++) {
    if (
      contacts[i].Connections[0].connection_id ===
      presentationSelected.connection_id
    ) {
      presentationSelected.contact_label = contacts[i].label
      break
    }
  }

  if (presentationSelected !== '') {
    let displayAttributes = ''
    let attributes = {}
    const requestName = JSON.parse(presentationSelected.presentation_request)
      .name

    if (presentationSelected.presentation) {
      const presentationRequestedProof = JSON.parse(
        presentationSelected.presentation
      ).requested_proof

      if (
        presentationRequestedProof.self_attested_attrs ||
        presentationRequestedProof.revealed_attrs
      ) {
        attributes = {
          ...presentationRequestedProof.self_attested_attrs,
          ...presentationRequestedProof.revealed_attrs,
        }
      }
    }

    if (
      attributes[Object.keys(attributes)[0]] &&
      attributes[Object.keys(attributes)[0]].raw !== null &&
      attributes[Object.keys(attributes)[0]].raw !== undefined
    ) {
      for (const attribute in attributes) {
        attributes[attribute] = attributes[attribute].raw
      }
    }

    if (presentationSelected.presentation) {
      displayAttributes = (
        <>
          <h2>Presentation Attributes</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Patient Surnames:</th>
                <td>{attributes.patient_surnames || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Given Names:</th>
                <td>{attributes.patient_given_names || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Date of Birth:</th>
                <td>{attributes.patient_date_of_birth || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Gender Legal:</th>
                <td>{attributes.patient_gender_legal || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Street Address:</th>
                <td>{attributes.patient_street_address || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient City:</th>
                <td>{attributes.patient_city || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient State/Province/Region:</th>
                <td>{attributes.patient_state_province_region || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Postalcode:</th>
                <td>{attributes.patient_postalcode || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Country:</th>
                <td>{attributes.patient_country || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Phone:</th>
                <td>{attributes.patient_phone || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Patient Email:</th>
                <td>{attributes.patient_email || ''}</td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
        </>
      )
    }

    return (
      <div id="contact">
        <PageHeader
          title={
            'Presentation request from ' + presentationSelected.contact_label ||
            ''
          }
        />
        <PageSection>
          <h2>Presentation Information</h2>
          <AttributeTable>
            <tbody>
              <AttributeRow>
                <th>Contact Label:</th>
                <td>{presentationSelected.contact_label || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Connection ID:</th>
                <td>{presentationSelected.connection_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Initiator:</th>
                <td>{presentationSelected.initiator || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Presentation Exchange ID:</th>
                <td>{presentationSelected.presentation_exchange_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Request Name:</th>
                <td>{requestName || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Role:</th>
                <td>{presentationSelected.role || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>State:</th>
                <td>{presentationSelected.state.replaceAll('_', ' ') || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Thread ID:</th>
                <td>{presentationSelected.thread_id || ''}</td>
              </AttributeRow>
              <AttributeRow>
                <th>Date Updated:</th>
                <td>
                  {new DateTime.fromISO(
                    presentationSelected.presentation_updated_at
                  ).toLocaleString(DateTime.DATETIME_MED) || ''}
                </td>
              </AttributeRow>
              <AttributeRow>
                <th>Date Created:</th>
                <td>
                  {new DateTime.fromISO(
                    presentationSelected.presentation_created_at
                  ).toLocaleString(DateTime.DATETIME_MED) || ''}
                </td>
              </AttributeRow>
            </tbody>
          </AttributeTable>
          {displayAttributes}
        </PageSection>
      </div>
    )
  } else {
    return (
      <div id="contact">
        <PageHeader title={'Presentation request'} />
        <PageSection>
          <h2>Presentation Information</h2>
        </PageSection>
      </div>
    )
  }
}

export default Presentation
