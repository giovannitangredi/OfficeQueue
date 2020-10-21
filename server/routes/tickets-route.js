// Import express
const express = require('express')

// Import books-controller
const ticketsRoutes = require('./../controllers/ticket-controller.js')

// Create router
const router = express.Router()

// Add route for POST request to create new ticket
router.post('/createticket', ticketsRoutes.newTicket)

// Add route for GET request to get the status and service
router.get('/filterticket', ticketsRoutes.ticketsFilter)

// Add route for GET request to get the next customer from longest queue
router.get('/nextperson', ticketsRoutes.nextPerson)

// Add route for POST request to update ticket
router.post('/updateticket', ticketsRoutes.updateTicket)


// Export router
module.exports = router