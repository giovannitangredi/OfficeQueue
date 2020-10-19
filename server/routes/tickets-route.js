// Import express
const express = require('express')

// Import books-controller
const ticketsRoutes = require('./../controllers/ticket-controller.js')

// Create router
const router = express.Router()

// Add route for POST request to create new ticket
router.post('/create', ticketsRoutes.newTicket)

// Add route for POST request to create new ticket
router.get('/filter', ticketsRoutes.ticketsFilter)

// Add route for POST request to create new ticket
router.post('/update', ticketsRoutes.updateTicket)


// Export router
module.exports = router