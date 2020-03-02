import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function DropDown(){
    return ( <Navbar expand="sm">
              <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Brand id='team-link' target='_blank' 
                href="https://sites.google.com/a/digital.cabinet-office.gov.uk/gds/operations/central-governance-team/operational-data-tools-team">
                Operational Data & Tools Team</Navbar.Brand>
                <Nav className="ml-auto">
                  <NavDropdown title="Tool Links" id="tool-dropdown">
                    <NavDropdown.Item  target="_blank"
                    href="https://script.google.com/a/digital.cabinet-office.gov.uk/macros/s/AKfycbyAECI3M0t15XI4QUEkU6jRxDwGKHmrB9DacQsznI0j47SbVpHe/exec">
                    Request HR Data Correction</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="https://script.google.com/a/digital.cabinet-office.gov.uk/macros/s/AKfycbyk0-Y3i73foIdi0NC8WytXrZ9jn_BXF8xbTaJ5AXmaaYw4FpU/exec">Resourcing Tool</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="https://script.google.com/a/digital.cabinet-office.gov.uk/macros/s/AKfycbwvQuZwQ7pp3TvfSF9aZOK9YN6HTdv8T6VcyCxPNrbyYZsTvVn2/exec">Delivery Tracker</NavDropdown.Item>
                    <NavDropdown.Item target="_blank" href="https://datastudio.google.com/u/0/reporting/1nGIF5ksoq7CmSaRMBZaFpb3d96LFOrJK/page/t7jg">PMO Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item target="_blank" href="https://script.google.com/a/digital.cabinet-office.gov.uk/macros/s/AKfycbzqkA77k4H3FYnUJKf56T_IUTfDgUeZWyxVtseF89MnGTvvcpn_/exec">Your Data</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
             </Navbar> );
  }

  export default DropDown;