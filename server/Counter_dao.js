'use strict';

const Counter = require('./Counter');
const db = require('./db/database.db');

const createCounter = function (row) {
    return new Counter (row.id, row.sid, row.cid); 
}
                    
/**
 * Get public Counters 
 */
exports.getallCounters = function() {
    return new Promise((resolve, reject) => {
        const sql = "select id,sid,cid from Counter";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let Counters = rows.map((row) => createCounter(row));
                resolve(Counters);
            }
        });
    });
}
 