import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.primary_color};
  color: ${(props) => props.theme.secondary_color};
  text-align: center;
  opacity: 50%;

  &:hover {
    opacity: 100%;
  }
`

function AppFooter(props) {
  const selectedGovernance = props.selectedGovernance

  return (
    <Footer id="app-footer">
      {/* <h3 style={{ marginTop: '0.2em', marginBottom: '0em' }}>Governance in use</h3> */}
      <p style={{ margin: '0.3em 0 0.5em 0' }}>
        Governance in use: {selectedGovernance ? selectedGovernance.label : ''}
      </p>
    </Footer>
  )
}

export default AppFooter
