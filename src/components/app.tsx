// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NextPerson from "./NextPerson"

// Import styles
import './../styles/styles.css'
const [tickets, setTickets] = useState([]);
const [numberPeople,setNumberPeople] = useState([]);
const fetchServingTickets =  () => {
  // Send GET request to 'screen/servingTickets' endpoint
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
      setNumberPeople(response.data);
    })
    .catch(error => console.error(`There was an error retrieving the number of peoples: ${error}`))
}
// Create App component
export const App = () => {
 

  return (
    <div className="app">
      Content
      <NextPerson/>
    </div>
  )
}
