import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
  position: fixed;
  right: 0;
  left: 240px;
  bottom: 0;
  /*grid-row: 2;
  grid-column: 1 / span 2;*/
  height: 30px;
  background-color: ${(props) => props.theme.primary_color};
  color: ${(props) => props.theme.text_light};
  text-align: center;
  z-index: 100;
`

function AppFooter(props) {
  const selectedGovernance = props.selectedGovernance

  return (
    <Footer id="app-footer">
      <p style={{ margin: '0.3em 0 0.5em 0' }}>
        Governance in use: {selectedGovernance ? selectedGovernance.label : ''}
      </p>
    </Footer>
  )
}

export default AppFooter
