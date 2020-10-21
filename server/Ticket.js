class Ticket {
 constructor(TID,type, waitingTime,CID,status)
 {
     this.TID=TID;
     this.type=type;
     this.CID=CID;
     this.status=status;
     this.waitingTime=waitingTime;
 }
};
module.exports = Ticket;