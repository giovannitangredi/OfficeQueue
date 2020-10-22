const knex = require('./db')
const Ticket = require('./Ticket')
const createTicket =(TID,type, waitingTime,CID,status,SID)=>{
    return new Ticket(TID,type, waitingTime,CID,status,SID);
}
const createRow = (type,n_people) =>{
    
    return {type : type, n_people: n_people};
}
exports.getServingTickets= async (req,res)=>{
    knex.select('*')
    .from('ticket').join('service', function() {
        this.on('ticket.SID','=','service.SID')
    }).where({Status : "S"}).then(rows=>{
       let resJson= rows.map(row=> createTicket(row.TID,row.Type, row.Time,row.CID,row.Status,row.SID));
      res.json(resJson);
    }).catch(err=> res.json({message: `There was ans error while retriving serving tickets ${err}`}));
}

exports.getNumberPeople = async (req,res)=>{
    knex.select('Type')
    .from('ticket').join('service', function() {
        this.on('ticket.SID','=','service.SID')
    }).where({Status : "A"}).groupBy('Type').count('*').then(rows=>{
       let resJson= rows.map(row => createRow(row.Type,row['count(*)']));
      res.json(resJson);
    }).catch(err=> res.json({message: `There was ans error while retriving serving tickets ${err}`}));
}