// Import express
const express = require('express')

// Import books-controller
const serviceRoutes = require('./../controllers/service-controller.js')

// Create router
const router = express.Router()

// Add route for POST request to create new ticket
router.get('/allservice', serviceRoutes.getService)

// Export router
module.exports = router