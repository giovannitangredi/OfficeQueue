// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NextPerson from "./NextPerson"
import ServiceSelectionView from './ServiceSelectionView';
import { Navbar, Container, Row } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

// Import styles
import './../styles/styles.css'

// Create App component
export const App = () => {
 

  return (
    <div className="app">
       <Row className='col-12 m-0 p-0' style={{ height: '10vh' }}>
        <Navbar expand="md" bg="light" className='col-12'>
        <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
          <h4 className="align-middle font-weight-bold ml-2 mb-0">Office Queue</h4>
        </div>                  
        </Navbar>
      </Row>
      <Row className='col-12 m-0 p-0' style={{ height: '90vh' }}>
        <Switch>
          <Route path="/officer">
            <NextPerson currentNumber="2" currentType="Money Transfer " currentSID="2" currentCID="1" />
          </Route>
          <Route path="/mainScreen">
            Main screen not yet implemented
          </Route>
          <Route>
            <Container fluid className='mx-0 p-0' >
              <ServiceSelectionView/>
            </Container>
          </Route>
        </Switch>
      </Row>
    </div>
    
  )
}
