
class Ticket {    
    constructor(tid, sid, status) {
        if(tid)
            this.tid = tid;

        this.sid = sid;
        this.status = status;
    }
}

module.exports = Ticket;


