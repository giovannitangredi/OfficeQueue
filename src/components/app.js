// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NextPerson from "./NextPerson"
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
      <ScreenShow tickets={tickets} numberPeople={numberPeople} />
    </div>
  )
}
