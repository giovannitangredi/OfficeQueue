'use strict';

const Service = require('./Service');
const db = require('./db/database.db');

const createService = function (row) {
    return new Service (row.tid, row.sid, row.status); 
}
                    
/**
 * Get public Services 
 */
exports.getallServices = function() {
    return new Promise((resolve, reject) => {
        const sql = "select tid,sid,status from Service";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let Services = rows.map((row) => createService(row));
                resolve(Services);
            }
        });
    });
}
 