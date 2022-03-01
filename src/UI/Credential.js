import React from 'react'

import PageHeader from './PageHeader.js'
import PageSection from './PageSection.js'
import { DateTime } from 'luxon'

import { AttributeTable, AttributeRow } from './CommonStylesTables'

function Credential(props) {
  const history = props.history
  const credential = props.credential
  const credentials = props.credentials

  let credentialSelected = ''

  for (let i = 0; i < credentials.length; i++) {
    if (credentials[i].credential_exchange_id == credential) {
      credentialSelected = credentials[i]
      break
    }
  }

  // Initialize variables to blank (to prevent errors during loading)
  let showCredential = {
    name: '',
    credential_exchange_id: '',
    state: '',
    date_created: '',
  }

  // Attributes of this kind of credential
  let showAttributes = {}
  let attributesSection = ''

  // Now set the values if we have a credential
  if (credentialSelected !== '') {
    showCredential.name =
      credentialSelected.credential_proposal_dict.schema_name.replaceAll(
        '_',
        ' '
      ) || ''
    showCredential.credential_exchange_id =
      credentialSelected.credential_exchange_id || ''
    showCredential.state = credentialSelected.state.replaceAll('_', ' ')
    showCredential.created_at =
      new DateTime.fromISO(credentialSelected.created_at).toLocaleString(
        DateTime.DATETIME_MED
      ) || ''

    // Values that depend on the credential being issued
    if (
      credentialSelected.credential !== null &&
      credentialSelected.credential !== undefined &&
      credentialSelected.credential.values !== null &&
      credentialSelected.credential.values !== undefined
    ) {
      const values = credentialSelected.credential.values

      if (showCredential.name === 'Lab Order') {
        //Name string for Label
        showAttributes.patient_name =
          values.patient_given_names.raw + ' ' + values.patient_surnames.raw

        showAttributes.mpid = values.mpid.raw || ''
        showAttributes.patient_local_id = values.patient_local_id.raw || ''
        showAttributes.patient_surnames = values.patient_surnames.raw || ''
        showAttributes.patient_given_names =
          values.patient_given_names.raw || ''
        showAttributes.patient_date_of_birth =
          new DateTime.fromSeconds(
            parseInt(values.patient_date_of_birth.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.patient_gender_legal =
          values.patient_gender_legal.raw || ''
        showAttributes.patient_street_address =
          values.patient_street_address.raw || ''
        showAttributes.patient_city = values.patient_city.raw || ''
        showAttributes.patient_state_province_region =
          values.patient_state_province_region.raw || ''
        showAttributes.patient_postalcode = values.patient_postalcode.raw || ''
        showAttributes.patient_country = values.patient_country.raw || ''
        showAttributes.patient_phone = values.patient_phone.raw || ''
        showAttributes.patient_email = values.patient_email.raw || ''
        showAttributes.lab_specimen_collected_date =
          new DateTime.fromSeconds(
            parseInt(values.lab_specimen_collected_date.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.lab_specimen_type = values.lab_specimen_type.raw || ''
        showAttributes.lab_order_id = values.lab_order_id.raw || ''
        showAttributes.lab_coding_qualifier =
          values.lab_coding_qualifier.raw || ''
        showAttributes.lab_code = values.lab_code.raw || ''
        showAttributes.lab_description = values.lab_description.raw || ''
        showAttributes.lab_performed_by = values.lab_performed_by.raw || ''
        showAttributes.ordering_facility_id =
          values.ordering_facility_id.raw || ''
        showAttributes.ordering_facility_id_qualifier =
          values.ordering_facility_id_qualifier.raw || ''
        showAttributes.ordering_facility_name =
          values.ordering_facility_name.raw || ''
        showAttributes.ordering_facility_state_province_region =
          values.ordering_facility_state_province_region.raw || ''
        showAttributes.ordering_facility_postalcode =
          values.ordering_facility_postalcode.raw || ''
        showAttributes.ordering_facility_country =
          values.ordering_facility_country.raw || ''
        showAttributes.credential_issuer_name =
          values.credential_issuer_name.raw || ''
        showAttributes.credential_issue_date =
          new DateTime.fromSeconds(
            parseInt(values.credential_issue_date.raw)
          ).toLocaleString(DateTime.DATETIME_MED) || ''

        attributesSection = (
          <div>
            <h2>Patient Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>MPID:</th>
                  <td>{showAttributes.mpid}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Local ID:</th>
                  <td>{showAttributes.patient_local_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Surnames:</th>
                  <td>{showAttributes.patient_surnames}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Given Names:</th>
                  <td>{showAttributes.patient_given_names}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Date of Birth:</th>
                  <td>{showAttributes.patient_date_of_birth}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Gender Legal:</th>
                  <td>{showAttributes.patient_gender_legal}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Street Address:</th>
                  <td>{showAttributes.patient_street_address}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient City:</th>
                  <td>{showAttributes.patient_city}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient State/Province/Region:</th>
                  <td>{showAttributes.patient_state_province_region}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Postalcode:</th>
                  <td>{showAttributes.patient_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Country:</th>
                  <td>{showAttributes.patient_country}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Phone:</th>
                  <td>{showAttributes.patient_phone}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Email:</th>
                  <td>{showAttributes.patient_email}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Lab Order Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Lab Specimen Collected Date:</th>
                  <td>{showAttributes.lab_specimen_collected_date}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Specimen Type:</th>
                  <td>{showAttributes.lab_specimen_type}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Order ID:</th>
                  <td>{showAttributes.lab_order_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Coding Qualifier:</th>
                  <td>{showAttributes.lab_coding_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Code:</th>
                  <td>{showAttributes.lab_code}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Description:</th>
                  <td>{showAttributes.lab_description}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Performed By:</th>
                  <td>{showAttributes.lab_performed_by}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Ordering Facility Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Ordering Facility ID:</th>
                  <td>{showAttributes.ordering_facility_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility ID Qualifier:</th>
                  <td>{showAttributes.ordering_facility_id_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility Name:</th>
                  <td>{showAttributes.ordering_facility_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility State/Province/Region:</th>
                  <td>
                    {showAttributes.ordering_facility_state_province_region}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility Postalcode:</th>
                  <td>{showAttributes.ordering_facility_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility Country:</th>
                  <td>{showAttributes.ordering_facility_country}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Credential Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Credential Issuer Name:</th>
                  <td>{showAttributes.credential_issuer_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Credential Issue Date:</th>
                  <td>{showAttributes.credential_issue_date}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
          </div>
        )
      } else if (showCredential.name === 'Lab Result') {
        //Name string for Label
        showAttributes.patient_name =
          values.patient_given_names.raw + ' ' + values.patient_surnames.raw

        showAttributes.mpid = values.mpid.raw || ''
        showAttributes.patient_local_id = values.patient_local_id.raw || ''
        showAttributes.patient_surnames = values.patient_surnames.raw || ''
        showAttributes.patient_given_names =
          values.patient_given_names.raw || ''
        showAttributes.patient_date_of_birth =
          new DateTime.fromSeconds(
            parseInt(values.patient_date_of_birth.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.patient_gender_legal =
          values.patient_gender_legal.raw || ''
        showAttributes.patient_street_address =
          values.patient_street_address.raw || ''
        showAttributes.patient_city = values.patient_city.raw || ''
        showAttributes.patient_state_province_region =
          values.patient_state_province_region.raw || ''
        showAttributes.patient_postalcode = values.patient_postalcode.raw || ''
        showAttributes.patient_country = values.patient_country.raw || ''
        showAttributes.patient_phone = values.patient_phone.raw || ''
        showAttributes.patient_email = values.patient_email.raw || ''
        showAttributes.lab_observation_date_time =
          new DateTime.fromSeconds(
            parseInt(values.lab_observation_date_time.raw)
          ).toLocaleString(DateTime.DATETIME_MED) || ''
        showAttributes.lab_specimen_collected_date =
          new DateTime.fromSeconds(
            parseInt(values.lab_specimen_collected_date.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.lab_specimen_type = values.lab_specimen_type.raw || ''
        showAttributes.lab_result_status = values.lab_result_status.raw || ''
        showAttributes.lab_coding_qualifier =
          values.lab_coding_qualifier.raw || ''
        showAttributes.lab_code = values.lab_code.raw || ''
        showAttributes.lab_description = values.lab_description.raw || ''
        showAttributes.lab_order_id = values.lab_order_id.raw || ''
        showAttributes.lab_normality = values.lab_normality.raw || ''
        showAttributes.lab_result = values.lab_result.raw || ''
        showAttributes.lab_comment = values.lab_comment.raw || ''
        showAttributes.lab_performed_by = values.lab_performed_by.raw || ''
        showAttributes.ordering_facility_id =
          values.ordering_facility_id.raw || ''
        showAttributes.ordering_facility_id_qualifier =
          values.ordering_facility_id_qualifier.raw || ''
        showAttributes.ordering_facility_name =
          values.ordering_facility_name.raw || ''
        showAttributes.ordering_facility_state_province_region =
          values.ordering_facility_state_province_region.raw || ''
        showAttributes.ordering_facility_postalcode =
          values.ordering_facility_postalcode.raw || ''
        showAttributes.ordering_facility_country =
          values.ordering_facility_country.raw || ''
        showAttributes.performing_laboratory_id =
          values.performing_laboratory_id.raw || ''
        showAttributes.performing_laboratory_id_qualifier =
          values.performing_laboratory_id_qualifier.raw || ''
        showAttributes.performing_laboratory_name =
          values.performing_laboratory_name.raw || ''
        showAttributes.performing_laboratory_state_province_region =
          values.performing_laboratory_state_province_region.raw || ''
        showAttributes.performing_laboratory_postalcode =
          values.performing_laboratory_postalcode.raw || ''
        showAttributes.performing_laboratory_country =
          values.performing_laboratory_country.raw || ''

        showAttributes.credential_issuer_name =
          values.credential_issuer_name.raw || ''
        showAttributes.credential_issue_date =
          new DateTime.fromSeconds(
            parseInt(values.credential_issue_date.raw)
          ).toLocaleString(DateTime.DATETIME_MED) || ''

        attributesSection = (
          <div>
            <h2>Patient Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>MPID:</th>
                  <td>{showAttributes.mpid}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Local ID:</th>
                  <td>{showAttributes.patient_local_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Surnames:</th>
                  <td>{showAttributes.patient_surnames}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Given Names:</th>
                  <td>{showAttributes.patient_given_names}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Date of Birth:</th>
                  <td>{showAttributes.patient_date_of_birth}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Gender Legal:</th>
                  <td>{showAttributes.patient_gender_legal}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Street Address:</th>
                  <td>{showAttributes.patient_street_address}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient City:</th>
                  <td>{showAttributes.patient_city}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient State/Province/Region:</th>
                  <td>{showAttributes.patient_state_province_region}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Postalcode:</th>
                  <td>{showAttributes.patient_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Country:</th>
                  <td>{showAttributes.patient_country}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Phone:</th>
                  <td>{showAttributes.patient_phone}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Email:</th>
                  <td>{showAttributes.patient_email}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Lab Result Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Lab Observation Date Time:</th>
                  <td>{showAttributes.lab_observation_date_time}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Specimen Collected Date:</th>
                  <td>{showAttributes.lab_specimen_collected_date}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Specimen Type:</th>
                  <td>{showAttributes.lab_specimen_type}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Result Status:</th>
                  <td>{showAttributes.lab_results_status}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Coding Qualifier:</th>
                  <td>{showAttributes.lab_coding_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Code:</th>
                  <td>{showAttributes.lab_code}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Description:</th>
                  <td>{showAttributes.lab_description}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Order ID:</th>
                  <td>{showAttributes.lab_order_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Normality:</th>
                  <td>{showAttributes.lab_normality}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Result:</th>
                  <td>{showAttributes.lab_result}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Comment:</th>
                  <td>{showAttributes.lab_comment}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Lab Performed By:</th>
                  <td>{showAttributes.lab_performed_by}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Ordering Facility Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Ordering Facility ID:</th>
                  <td>{showAttributes.ordering_facility_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility ID Qualifier:</th>
                  <td>{showAttributes.ordering_facility_id_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility Name:</th>
                  <td>{showAttributes.ordering_facility_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility State/Province/Region:</th>
                  <td>
                    {showAttributes.ordering_facility_state_province_region}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility Postalcode:</th>
                  <td>{showAttributes.ordering_facility_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Ordering Facility Country:</th>
                  <td>{showAttributes.ordering_facility_country}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Performing Laboratory Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Performing Laboratory ID:</th>
                  <td>{showAttributes.performing_laboratory_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Performing Laboratory ID Qualifier:</th>
                  <td>{showAttributes.performing_laboratory_id_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Performing Laboratory Name:</th>
                  <td>{showAttributes.performing_laboratory_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Performing Laboratory State/Province/Region:</th>
                  <td>
                    {showAttributes.performing_laboratory_state_province_region}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Performing Laboratory Postalcode:</th>
                  <td>{showAttributes.performing_laboratory_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Performing Laboratory Country:</th>
                  <td>{showAttributes.performing_laboratory_country}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Credential Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Credential Issuer Name:</th>
                  <td>{showAttributes.credential_issuer_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Credential Issue Date:</th>
                  <td>{showAttributes.credential_issue_date}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
          </div>
        )
      } else if (showCredential.name === 'Vaccination') {
        //Name string for Label
        showAttributes.patient_name =
          values.patient_given_names.raw + ' ' + values.patient_surnames.raw

        showAttributes.mpid = values.mpid.raw || ''
        showAttributes.patient_local_id = values.patient_local_id.raw || ''
        showAttributes.patient_surnames = values.patient_surnames.raw || ''
        showAttributes.patient_given_names =
          values.patient_given_names.raw || ''
        showAttributes.patient_date_of_birth =
          new DateTime.fromSeconds(
            parseInt(values.patient_date_of_birth.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.patient_gender_legal =
          values.patient_gender_legal.raw || ''
        showAttributes.patient_street_address =
          values.patient_street_address.raw || ''
        showAttributes.patient_city = values.patient_city.raw || ''
        showAttributes.patient_state_province_region =
          values.patient_state_province_region.raw || ''
        showAttributes.patient_postalcode = values.patient_postalcode.raw || ''
        showAttributes.patient_country = values.patient_country.raw || ''
        showAttributes.patient_phone = values.patient_phone.raw || ''
        showAttributes.patient_email = values.patient_email.raw || ''

        showAttributes.vaccine_record_id = values.vaccine_record_id.raw || ''
        showAttributes.vaccine_administration_facility_id =
          values.vaccine_administration_facility_id.raw || ''
        showAttributes.vaccine_administration_facility_id_qualifier =
          values.vaccine_administration_facility_id_qualifier.raw || ''
        showAttributes.vaccine_administration_facility_name =
          values.vaccine_administration_facility_name.raw || ''
        showAttributes.vaccine_administration_state_province_region =
          values.vaccine_administration_state_province_region.raw || ''
        showAttributes.vaccine_administration_postalcode =
          values.vaccine_administration_postalcode.raw || ''
        showAttributes.vaccine_administration_country =
          values.vaccine_administration_country.raw || ''
        showAttributes.vaccine_administration_date =
          new DateTime.fromSeconds(
            parseInt(values.vaccine_administration_date.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.vaccine_dose_number =
          values.vaccine_dose_number.raw || ''
        showAttributes.vaccine_series_complete =
          values.vaccine_series_complete.raw || ''
        showAttributes.vaccine_lot_number = values.vaccine_lot_number.raw || ''
        showAttributes.vaccine_code = values.vaccine_code.raw || ''
        showAttributes.vaccine_code_qualifier =
          values.vaccine_code_qualifier.raw || ''
        showAttributes.vaccine_code_name = values.vaccine_code_name.raw || ''
        showAttributes.vaccine_manufacturer_code =
          values.vaccine_manufacturer_code.raw || ''
        showAttributes.vaccine_manufacturer_code_qualifier =
          values.vaccine_manufacturer_code_qualifier.raw || ''
        showAttributes.vaccine_manufacturer_code_name =
          values.vaccine_manufacturer_code_name.raw || ''
        showAttributes.vaccine_disease_target_code =
          values.vaccine_disease_target_code.raw || ''
        showAttributes.vaccine_disease_target_code_qualifier =
          values.vaccine_disease_target_code_qualifier.raw || ''
        showAttributes.vaccine_disease_target_name =
          values.vaccine_disease_target_name.raw || ''
        showAttributes.vaccine_administration_provider_id =
          values.vaccine_administration_provider_id.raw || ''
        showAttributes.vaccine_administration_provider_id_qualifier =
          values.vaccine_administration_provider_id_qualifier.raw || ''
        showAttributes.vaccine_administration_provider_fullname =
          values.vaccine_administration_provider_fullname.raw || ''
        showAttributes.vaccine_education_reference_material =
          values.vaccine_education_reference_material.raw || ''

        showAttributes.sending_facility = values.sending_facility.raw || ''
        showAttributes.certificate_original_issuer =
          values.certificate_original_issuer.raw || ''
        showAttributes.certificate_original_identifier =
          values.certificate_original_identifier.raw || ''
        showAttributes.credential_issuer_name =
          values.credential_issuer_name.raw || ''
        showAttributes.credential_issue_date =
          new DateTime.fromSeconds(
            parseInt(values.credential_issue_date.raw)
          ).toLocaleString(DateTime.DATETIME_MED) || ''

        attributesSection = (
          <div>
            <h2>Patient Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>MPID:</th>
                  <td>{showAttributes.mpid}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Local ID:</th>
                  <td>{showAttributes.patient_local_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Surnames:</th>
                  <td>{showAttributes.patient_surnames}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Given Names:</th>
                  <td>{showAttributes.patient_given_names}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Date of Birth:</th>
                  <td>{showAttributes.patient_date_of_birth}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Gender Legal:</th>
                  <td>{showAttributes.patient_gender_legal}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Street Address:</th>
                  <td>{showAttributes.patient_street_address}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient City:</th>
                  <td>{showAttributes.patient_city}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient State/Province/Region:</th>
                  <td>{showAttributes.patient_state_province_region}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Postalcode:</th>
                  <td>{showAttributes.patient_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Country:</th>
                  <td>{showAttributes.patient_country}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Phone:</th>
                  <td>{showAttributes.patient_phone}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Email:</th>
                  <td>{showAttributes.patient_email}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Vaccination Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Vaccine Record ID:</th>
                  <td>{showAttributes.vaccine_record_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Facility ID:</th>
                  <td>{showAttributes.vaccine_administration_facility_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Facility ID Qualifier:</th>
                  <td>
                    {
                      showAttributes.vaccine_administration_facility_id_qualifier
                    }
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Facility Name:</th>
                  <td>{showAttributes.vaccine_administration_facility_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration State/Province/Region:</th>
                  <td>
                    {
                      showAttributes.vaccine_administration_state_province_region
                    }
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Postalcode:</th>
                  <td>{showAttributes.vaccine_administration_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Country:</th>
                  <td>{showAttributes.vaccine_administration_country}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Date:</th>
                  <td>{showAttributes.vaccine_administration_date}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Dose Number:</th>
                  <td>{showAttributes.vaccine_dose_number}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Series Complete:</th>
                  <td>{showAttributes.vaccine_series_complete}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Lot Number:</th>
                  <td>{showAttributes.vaccine_lot_number}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Code:</th>
                  <td>{showAttributes.vaccine_code}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Code Qualifier:</th>
                  <td>{showAttributes.vaccine_code_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Code Name:</th>
                  <td>{showAttributes.vaccine_code_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Manufacturer Code:</th>
                  <td>{showAttributes.vaccine_manufacturer_code}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Manufacturer Code Qualifier:</th>
                  <td>{showAttributes.vaccine_manufacturer_code_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Manufacturer Code Name:</th>
                  <td>{showAttributes.vaccine_manufacturer_code_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Disease Target Code:</th>
                  <td>{showAttributes.vaccine_disease_target_code}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Disease Target Code Qualifier:</th>
                  <td>
                    {showAttributes.vaccine_disease_target_code_qualifier}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Disease Target Name:</th>
                  <td>{showAttributes.vaccine_disease_target_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Provider ID:</th>
                  <td>{showAttributes.vaccine_administration_provider_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Provider ID Qualifier:</th>
                  <td>
                    {
                      showAttributes.vaccine_administration_provider_id_qualifier
                    }
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Administration Provider Full Name:</th>
                  <td>
                    {showAttributes.vaccine_administration_provider_fullname}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Vaccine Education Reference Material:</th>
                  <td>{showAttributes.vaccine_education_reference_material}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Credential Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Sending Facility:</th>
                  <td>{showAttributes.sending_facility}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Certificate Original Issuer:</th>
                  <td>{showAttributes.certificate_original_issuer}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Certificate Original Identifier:</th>
                  <td>{showAttributes.certificate_original_identifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Credential Issuer Name:</th>
                  <td>{showAttributes.credential_issuer_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Credential Issue Date:</th>
                  <td>{showAttributes.credential_issue_date}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
          </div>
        )
      } else if (showCredential.name === 'Vaccine Exemption') {
        //Name string for Label
        showAttributes.patient_name =
          values.patient_given_names.raw + ' ' + values.patient_surnames.raw

        showAttributes.mpid = values.mpid.raw || ''
        showAttributes.patient_local_id = values.patient_local_id.raw || ''
        showAttributes.patient_surnames = values.patient_surnames.raw || ''
        showAttributes.patient_given_names =
          values.patient_given_names.raw || ''
        showAttributes.patient_date_of_birth =
          new DateTime.fromSeconds(
            parseInt(values.patient_date_of_birth.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.patient_gender_legal =
          values.patient_gender_legal.raw || ''
        showAttributes.patient_street_address =
          values.patient_street_address.raw || ''
        showAttributes.patient_city = values.patient_city.raw || ''
        showAttributes.patient_state_province_region =
          values.patient_state_province_region.raw || ''
        showAttributes.patient_postalcode = values.patient_postalcode.raw || ''
        showAttributes.patient_country = values.patient_country.raw || ''
        showAttributes.patient_phone = values.patient_phone.raw || ''
        showAttributes.patient_email = values.patient_email.raw || ''

        showAttributes.exemption_record_id =
          values.exemption_record_id.raw || ''
        showAttributes.exemption_requestor =
          values.exemption_requestor.raw || ''
        showAttributes.exemption_requestor_relationship =
          values.exemption_requestor_relationship.raw || ''
        showAttributes.exemption_issue_date =
          new DateTime.fromSeconds(
            parseInt(values.exemption_issue_date.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.exemption_state_province_region =
          values.exemption_state_province_region.raw || ''
        showAttributes.exemption_country = values.exemption_country.raw || ''
        showAttributes.exemption_type = values.exemption_type.raw || ''
        showAttributes.exemption_medical_permanent =
          values.exemption_medical_permanent.raw || ''
        showAttributes.exemption_note = values.exemption_note.raw || ''
        showAttributes.exemption_from_all = values.exemption_from_all.raw || ''
        showAttributes.exemption_diseases_code =
          values.exemption_diseases_code.raw || ''
        showAttributes.exemption_disease_code_qualifier =
          values.exemption_disease_code_qualifier.raw || ''
        showAttributes.exemption_disease_code_name =
          values.exemption_disease_code_name.raw || ''
        showAttributes.exemption_medical_physician_surnames =
          values.exemption_medical_physician_surnames.raw || ''
        showAttributes.exemption_medical_physician_given_names =
          values.exemption_medical_physician_given_names.raw || ''
        showAttributes.exemption_medical_physician_full_name =
          values.exemption_medical_physician_full_name.raw || ''
        showAttributes.exemption_medical_physician_license_number =
          values.exemption_medical_physician_license_number.raw || ''
        showAttributes.exemption_medical_physician_license_type =
          values.exemption_medical_physician_license_type.raw || ''
        showAttributes.exemption_medical_physician_license_state_province_region =
          values.exemption_medical_physician_license_state_province_region
            .raw || ''
        showAttributes.exemption_medical_physician_license_country =
          values.exemption_medical_physician_license_country.raw || ''
        showAttributes.exemption_expiration_date =
          new DateTime.fromSeconds(
            parseInt(values.exemption_expiration_date.raw)
          ).toLocaleString(DateTime.DATE_MED) || ''
        showAttributes.exemption_credential_issuer =
          values.exemption_credential_issuer.raw || ''

        showAttributes.certificate_original_issuer =
          values.certificate_original_issuer.raw || ''
        showAttributes.certificate_original_identifier =
          values.certificate_original_identifier.raw || ''
        showAttributes.credential_issuer_name =
          values.credential_issuer_name.raw || ''
        showAttributes.credential_issue_date =
          new DateTime.fromSeconds(
            parseInt(values.credential_issue_date.raw)
          ).toLocaleString(DateTime.DATETIME_MED) || ''

        attributesSection = (
          <div>
            <h2>Patient Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>MPID:</th>
                  <td>{showAttributes.mpid}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Local ID:</th>
                  <td>{showAttributes.patient_local_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Surnames:</th>
                  <td>{showAttributes.patient_surnames}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Given Names:</th>
                  <td>{showAttributes.patient_given_names}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Date of Birth:</th>
                  <td>{showAttributes.patient_date_of_birth}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Gender Legal:</th>
                  <td>{showAttributes.patient_gender_legal}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Street Address:</th>
                  <td>{showAttributes.patient_street_address}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient City:</th>
                  <td>{showAttributes.patient_city}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient State/Province/Region:</th>
                  <td>{showAttributes.patient_state_province_region}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Postalcode:</th>
                  <td>{showAttributes.patient_postalcode}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Country:</th>
                  <td>{showAttributes.patient_country}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Phone:</th>
                  <td>{showAttributes.patient_phone}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Patient Email:</th>
                  <td>{showAttributes.patient_email}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Exemption Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Exemption Record ID:</th>
                  <td>{showAttributes.exemption_record_id}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Requestor:</th>
                  <td>{showAttributes.exemption_requestor}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Requestor Relationship:</th>
                  <td>{showAttributes.exemption_requestor_relationship}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Issue Date:</th>
                  <td>{showAttributes.exemption_issue_date}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption State/Province/Region:</th>
                  <td>{showAttributes.exemption_state_province_region}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Country:</th>
                  <td>{showAttributes.exemption_country}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Type:</th>
                  <td>{showAttributes.exemption_type}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Permanent:</th>
                  <td>{showAttributes.exemption_medical_permanent}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Note:</th>
                  <td>{showAttributes.exemption_note}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption From All:</th>
                  <td>{showAttributes.exemption_from_all}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Diseases Code:</th>
                  <td>{showAttributes.exemption_diseases_code}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Disease Code Qualifier:</th>
                  <td>{showAttributes.exemption_disease_code_qualifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Disease Code Name:</th>
                  <td>{showAttributes.exemption_disease_code_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Physician Surnames:</th>
                  <td>{showAttributes.exemption_medical_physician_surnames}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Physician Given Names:</th>
                  <td>
                    {showAttributes.exemption_medical_physician_given_names}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Physician Full Name:</th>
                  <td>
                    {showAttributes.exemption_medical_physician_full_name}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Physician License Number:</th>
                  <td>
                    {showAttributes.exemption_medical_physician_license_number}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Physician License Type:</th>
                  <td>
                    {showAttributes.exemption_medical_physician_license_type}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>
                    Exemption Medical Physician License State/Province/Region:
                  </th>
                  <td>
                    {
                      showAttributes.exemption_medical_physician_license_state_province_region
                    }
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Medical Physician License Country:</th>
                  <td>
                    {showAttributes.exemption_medical_physician_license_country}
                  </td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Expiration Date:</th>
                  <td>{showAttributes.exemption_expiration_date}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Exemption Credential Issuer:</th>
                  <td>{showAttributes.exemption_credential_issuer}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
            <h2>Credential Information</h2>
            <AttributeTable>
              <tbody>
                <AttributeRow>
                  <th>Certificate Original Issuer:</th>
                  <td>{showAttributes.certificate_original_issuer}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Certificate Original Identifier:</th>
                  <td>{showAttributes.certificate_original_identifier}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Credential Issuer Name:</th>
                  <td>{showAttributes.credential_issuer_name}</td>
                </AttributeRow>
                <AttributeRow>
                  <th>Credential Issue Date:</th>
                  <td>{showAttributes.credential_issue_date}</td>
                </AttributeRow>
              </tbody>
            </AttributeTable>
          </div>
        )
      }
    }
  }

  return (
    <div id="contact">
      <PageHeader
        title={showCredential.name + ' for ' + showAttributes.patient_name}
      />
      <PageSection>
        <h2>General Information</h2>
        <AttributeTable>
          <tbody>
            <AttributeRow>
              <th>Credential Name:</th>
              <td>{showCredential.name}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Credential ID:</th>
              <td>{showCredential.credential_exchange_id}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Credential State:</th>
              <td>{showCredential.state}</td>
            </AttributeRow>
            <AttributeRow>
              <th>Date Created:</th>
              <td>{showCredential.created_at}</td>
            </AttributeRow>
          </tbody>
        </AttributeTable>
        {attributesSection}
      </PageSection>
    </div>
  )
}

export default Credential
