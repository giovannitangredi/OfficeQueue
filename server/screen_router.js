const express = require('express')

const systemRoutes = require('./screen_controller.js')

// Create router
const router = express.Router()

router.get('/servingTickets',systemRoutes.getServingTickets)

module.exports = router;
