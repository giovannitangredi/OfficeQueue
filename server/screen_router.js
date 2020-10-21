const express = require('express')

const sceenRoutes = require('./screen_controller.js')

// Create router
const router = express.Router()

router.get('/servingTickets',sceenRoutes.getServingTickets)
router.get('/NumberPeoples',sceenRoutes.getNumberPeople)
module.exports = router;
