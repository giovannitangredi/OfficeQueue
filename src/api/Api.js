
async function getServices() {

    const fakeServices = [
        {
            id: 'S001',
            type: 'pay bills'
        }, 
        {
            id: 'S002',
            type: 'collect a parcel'
        }, 
        {
            id: 'S003',
            type: 'send a parcel'
        }
    ];

    return fakeServices;
}

async function getServiceInfo(serviceID) {

    const fakeInfo = [
        {
            id: 'S001',
            type: 'pay bills',
            queueLength: 10,
            waitingTime: 72
        }, 
        {
            id: 'S002',
            type: 'collect a parcel',
            queueLength: 20,
            waitingTime: 60
        }, 
        {
            id: 'S003',
            type: 'send a parcel',
            queueLength: 5,
            waitingTime: 25
        }
    ];

    let info = {
        id: '',
        type: '',
        queueLength: -1,
        waitingTime: -1
    };

    switch(serviceID) {
        case 'S001':
            info = fakeInfo[0];
            break;
        case 'S002':
            info = fakeInfo[1];
            break;
        case 'S003':
            info = fakeInfo[2];
            break;

    }

    return info;
}


const api = { getServices, getServiceInfo };

export default api;