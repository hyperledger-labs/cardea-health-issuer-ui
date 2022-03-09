import React, { useEffect, useState } from 'react'

import PageHeader from './PageHeader'
import PageSection from './PageSection'

import { DataTable, DataRow, DataHeader, DataCell } from './CommonStylesTables'

function Presentations(props) {
  let presentations = props.presentationReports
  const contacts = props.contacts

  // (AmmonBurgi) Match up the connection_id's and give each presentation a contact_label. Used for-loop for speed.
  for (let i = 0; i < presentations.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (
        presentations[i].connection_id ===
        contacts[j].Connections[0].connection_id
      ) {
        presentations[i].contact_label = contacts[j].label
        break
      }
    }
  }

  function openPresentation(history, id) {
    if (history !== undefined) {
      history.push('/presentations/' + id)
    }
  }

  const presentationRows = presentations.map((presentation_record) => {
    const presentation_id = presentation_record.presentation_exchange_id
    const presentationState =
      presentation_record.state.replaceAll('_', ' ') || ''
    const dateCreated =
      new Date(presentation_record.created_at).toLocaleString() || ''
    const requestName = JSON.parse(presentation_record.presentation_request)
      .name

    return (
      <DataRow
        key={presentation_id}
        onClick={() => {
          openPresentation(props.history, presentation_id)
        }}
      >
        <DataCell>{presentation_record.contact_label}</DataCell>
        <DataCell>{requestName}</DataCell>
        <DataCell className="title-case">{presentationState}</DataCell>
        <DataCell>{dateCreated}</DataCell>
      </DataRow>
    )
  })

  return (
    <>
      <div id="presentations">
        <PageHeader title={'Presentations'} />
        <PageSection>
          <DataTable>
            <thead>
              <DataRow>
                <DataHeader>Label</DataHeader>
                <DataHeader>Request Name</DataHeader>
                <DataHeader>Status</DataHeader>
                <DataHeader>Date Issued</DataHeader>
              </DataRow>
            </thead>
            <tbody>{presentationRows}</tbody>
          </DataTable>
        </PageSection>
      </div>
    </>
  )
}

export default Presentations
