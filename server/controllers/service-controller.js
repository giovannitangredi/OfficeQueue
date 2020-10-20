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