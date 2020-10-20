// Import express
const express = require('express')

// Import books-controller
const ticketsRoutes = require('./../controllers/ticket-controller.js')

// Create router
const router = express.Router()

// Add route for POST request to create new ticket
router.post('/createticket', ticketsRoutes.newTicket)

// Add route for POST request to create new ticket
router.get('/filterticket', ticketsRoutes.ticketsFilter)

// Add route for POST request to create new ticket
router.post('/updateticket', ticketsRoutes.updateTicket)


// Export router
module.exports = router