import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';

function ServiceSelectionView() {
    const [services, setServices] = useState([]);
    const [currentService, setCurrentService] = useState('');
    const [queueLength, setQueueLength] = useState(0);

    useEffect(()=>{
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
                setServices(fakeServices);
    }, []);

    const handleServiceSelection = (serviceID) => {
        setCurrentService(serviceID);
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
            default:
                break;
    
        }
        setQueueLength(info.queueLength);
    }

    return (
        <Container>
            <Row>
                <h4 className='mx-auto mt-3 text-center p-2'>Available services</h4>
            </Row>
            <Row >
                <Col sm={12} style={{ maxHeight: '60vh' }} className='mx-auto overflow-auto p-3'>
                    
                    <ListGroup variant="flush">
                        {
                            services.map(s =>
                                <ListGroup.Item key={s.id} active={currentService === s.id ? true : false} onClick={()=>handleServiceSelection(s.id)} action className='rounded-pill mx-auto mt-3 shadow text-center w-75 p-4'> 
                                    {s.type} 
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                    
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="d-flex flex-column justify-content-center">
                        <div className="my-auto">
                    {
                        currentService !== '' ?
                        <>
                            <p className="mt-auto text-center"><strong>People in queue: {queueLength}</strong></p>
                        </>
                        :
                            <p className="my-auto text-center">Select a service to get more information</p>
                        }
                        </div>
                    
                </Col>
            </Row>
            <Row>
                <Button disabled={currentService === '' ? true : false} className="my-2 mx-auto">
                    Get the ticket
                </Button>
            </Row>
        </Container>
    );
}

export default ServiceSelectionView;