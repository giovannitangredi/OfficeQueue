// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NextPerson from "./NextPerson"

// Import styles
import './../styles/styles.css'

// Create App component
export const App = () => {
 

  return (
    <div className="app">
      Content
      <NextPerson currentNumber="2" currentType="Pay" />
    </div>
  )
}
