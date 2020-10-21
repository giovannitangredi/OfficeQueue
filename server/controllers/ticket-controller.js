// Import database
const knex = require('./../db')

// Retrieve filter ticket with type request + status
exports.ticketsFilter = async (req, res) => {
  knex
    .select('*') 
    .from('ticket') 
    .where({
      'SID': req.query.SID,
      'Status': req.query.Status
    })
    .then(ticketsfiltered => {
      res.json(ticketsfiltered)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tickets: ${err}` })
    })
}

// Extract next person from longest queue
exports.nextPerson = async (req, res) => {
  knex
    .select('TID') 
    .from('ticket') 
    .whereIn('SID', function() {
      this.select('SID', knex.raw('COUNT(*) as count')).from('ticket')
          .whereIn('SID', function() {this.select('SID').from('counter').where({'CID': req.query.CID})})         
      .andWhere({'Status': 'ok'})    //Status code for pending????
      .groupBy('SID').orderBy('count', 'desc').limit(1)})
      .orderBy('TID').limit(1)
    .then(nextperson => {
      res.json(nextperson)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tickets: ${err}` })
    })
}

// Extract number of the longest queues
exports.longestQueue = async (req, res) => {
  knex.raw(`SELECT COUNT(*) FROM (SELECT SID FROM TICKET 
                                  WHERE SID IN (SELECT SID FROM counter where CID = COUNTERID) 
                                  GROUP BY SID HAVING COUNT(*) = (SELECT COUNT(*) 
                                        FROM ticketWHERE SID IN (SELECT SID FROM counter where CID = COUNTERID) 
                                        GROUP BY SID ORDER BY COUNT(*) DESC LIMIT 1))`)
 .then(nextperson => {
      res.json(nextperson)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving tickets: ${err}` })
    })
}

// Insert new ticket
exports.newTicket = async (req, res) => {
  // Insert new ticket from database
  knex('ticket')
    .insert({ // insert new record, a ticket
    'SID': req.body.SID,
    'Status': req.body.Status,
    //'CID': '0',  //at the insert no counter associated
    //'timestamp': req.body.timestamp
  })
  .then(() => {
    // Send a success message in response
    res.json({ message: `Ticket created.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error creating the ticket` })
  })
}

// Update status ticket
exports.updateTicket = async (req, res) => {
  // Update ticket in database
  knex('ticket')
  .where('TID',req.body.TID)
    .update({ // insert new record, a ticket
    'Status': req.body.Status,
    //'CID': req.body.CID,
  })
  .then(() => {
    // Send a success message in response
    res.json({ message: `Ticket not updated.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error updating the ticket` })
  })
}

