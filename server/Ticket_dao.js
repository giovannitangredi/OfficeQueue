'use strict';

const Ticket = require('./Ticket');
const db = require('./db/database.db');

const createTicket = function (row) {
    return new Ticket (row.tid, row.sid, row.status); 
}
                    
/**
 * Get public Tickets 
 */
exports.getallTickets = function() {
    return new Promise((resolve, reject) => {
        const sql = "select  tid , sid , status from ticket;";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let Tickets = rows.map((row) => createTicket(row));
                resolve(Tickets);
            }
        });
    });

