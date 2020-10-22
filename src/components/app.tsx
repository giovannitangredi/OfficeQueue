// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NextPerson from "./NextPerson"
import ServiceSelectionView from './ServiceSelectionView';
import { Navbar, Container, Row } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import ScreenShow from "./ScreenShow"

// Import styles
import './../styles/styles.css'

// Create App component
export const App = () => {
  const [tickets, setTickets] = useState([]);
  const [numberPeople,setNumberPeople] = useState({});
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    fetchServingTickets();
  }, [])
  const fetchServingTickets =  () => {
  // Send GET request to 'screen/servingTickets' endpoint
  setLoading(true);
  axios
    .get('http://localhost:4001/screen/servingTickets')
    .then(response => {
      
      setTickets(response.data);
        fetchNumberPeople();
        
    })
    .catch(error => console.error(`There was an error retrieving the ticket list: ${error}`))
}
  const fetchNumberPeople = async () => {
  // Send GET request to 'screen/servingTickets' endpoint
  axios
    .get('http://localhost:4001/screen/NumberPeoples')
    .then(response => {
      let res ={};
      response.data.map((el)=> res[el.type]=el.n_people);
      setNumberPeople(res);
      setLoading(false);
    })
    .catch(error => console.error(`There was an error retrieving the number of peoples: ${error}`))
}
  if (loading) 
  return <p> table is loading...</p>

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
            {
              loading? <p> table is loading...</p>
              : <ScreenShow tickets={tickets} numberPeople={numberPeople} />
            }
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
