
class Service {    
    constructor(sid,type,time) {
        if(sid)
            this.sid = sid;

        this.type = type;
        this.time = time;
    }
}

module.exports = Service;


