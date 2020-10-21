const knex = require('./db')
const Ticket = require('./Ticket')
const createTicket =(TID,type, waitingTime,CID,status)=>{
    return new Ticket(TID,type, waitingTime,CID,status);
}
exports.getServingTickets= async (req,res)=>{
    knex.select('*')
    .from('ticket').join('service', function() {
        this.on('ticket.CID','=','counter.CID')
    }).join('counter', function() {
        this.on('ticket.SID','=','service.SID')
    }).where({Status : "S"}).then(rows=>{
       let resJson= rows.map(row=> createTicket(row.TID,row.Type, row.Time,row.CID,row.Status));
      res.json(resJson);
    }).catch(err=> res.json({message: `There was ans error while retriving serving tickets ${err}`}));
}