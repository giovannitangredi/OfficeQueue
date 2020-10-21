const knex = require('./db')
const Ticket = require('./Ticket')
const createTicket =(TID,type, waitingTime,CID,status)=>{
    return new Ticket(TID,type, waitingTime,CID,status);
}
const createRow = (type,n_people) =>{
    return {Type : type , n_people : n_people};
}
exports.getServingTickets= async (req,res)=>{
    knex.select('*')
    .from('ticket').join('service', function() {
        this.on('ticket.SID','=','service.SID')
    }).join('counter', function() {
        this.on('ticket.CID','=','counter.CID')
    }).where({Status : "S"}).then(rows=>{
       let resJson= rows.map(row=> createTicket(row.TID,row.Type, row.Time,row.CID,row.Status));
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