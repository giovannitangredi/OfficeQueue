// Import database
const knex = require('./../db')

// Retrieve all services
exports.getService = async (req, res) => {
  knex
    .select('*') 
    .from('service') 
    .then(serviceType => {
      res.json(serviceType)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving type of service: ${err}` })
    })
}

exports.getServiceTicket = async (req, res) => {
  knex.raw(`SELECT Type FROM service,ticket WHERE service.SID=ticket.SID AND TID = ?`, req.query.TID)
    .then(sid => {
      res.json(sid)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving service: ${err}` })
    })
}