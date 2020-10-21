// Import database
const knex = require("./../db");

// Retrieve filter ticket with type request + status
exports.ticketsFilter = async (req, res) => {
  knex
    .select("*")
    .from("ticket")
    .where({
      SID: req.query.SID,
      Status: req.query.Status,
    })
    .then((ticketsfiltered) => {
      res.json(ticketsfiltered);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving tickets: ${err}` });
    });
};

// Extract next person from longest queue
exports.nextPerson = async (req, res) => {
  knex
    .raw(
      `SELECT TID 
  FROM ticket 
  WHERE SID = (
              SELECT t.SID 
              FROM ticket t, service s
              WHERE t.SID IN (SELECT SID FROM counter where CID = ?)
              AND Status = 'A' AND t.SID = s.SID
              GROUP BY t.SID
              HAVING COUNT(*) = (SELECT COUNT(*)
                                  FROM ticket
                                  WHERE SID IN (SELECT SID FROM counter where CID = ?)
                                  AND Status = 'A'
                                  GROUP BY SID 
                                  ORDER BY COUNT(*) 
                                  DESC LIMIT 1)
              ORDER BY Time
              LIMIT 1
              )
  AND Status = 'A'
  ORDER BY TID
  LIMIT 1;`,
      [req.query.CID, req.query.CID]
    )

    .then((nextperson) => {
      res.json(nextperson);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving tickets: ${err}` });
    });
};

// Insert new ticket
exports.newTicket = async (req, res) => {
  // Insert new ticket from database
  knex("ticket")
    .insert({
      // insert new record, a ticket
      SID: req.body.SID,
      Status: req.body.Status,
      //'CID': '0',  //at the insert no counter associated
      //'timestamp': req.body.timestamp
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Ticket created.` });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error creating the ticket` });
    });
};

// Update status ticket
exports.updateTicket = async (req, res) => {
  // Update ticket in database
  knex("ticket")
    .where("TID", req.body.TID)
    .update({
      // insert new record, a ticket
      Status: req.body.Status,
      CID: req.body.CID,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Ticket updated.` });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error updating the ticket` });
    });
};
