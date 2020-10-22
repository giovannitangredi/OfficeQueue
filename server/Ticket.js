class Ticket {
 constructor(TID,type, waitingTime,CID,status,SID)
 {
     this.TID=TID;
     this.type=type;
     this.CID=CID;
     this.status=status;
     this.waitingTime=waitingTime;
     this.SID=SID;
 }
};
module.exports = Ticket;