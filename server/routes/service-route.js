// Import express
const express = require('express')

// Import books-controller
const serviceRoutes = require('./../controllers/service-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all services
router.get('/allservice', serviceRoutes.getService)

// Add route for GET request to retrive a service from the ticket
router.get('/serviceticket', serviceRoutes.getServiceTicket)



// Export router
module.exports = router