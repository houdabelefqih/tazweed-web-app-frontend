

import React from 'react'
import { Card, Button, Icon, Image } from 'semantic-ui-react'
import clock from '../images/compass.png'

function Appointment(props) {
    const { slot, client, seller, status } = props.appointment;

    return (
        <Card fluid >
            <Card.Content floated='center'>
                <Image
                    floated='right'
                    size='mini'
                    src={clock}
                />
                <Card.Header>{client.user.firstName} {client.user.lastName}</Card.Header>
                <Card.Meta>{slot.start} - {slot.end}</Card.Meta>
                <Card.Description>
                {status} @ {seller.shop}
                </Card.Description>

            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    
                    <Button basic color='green'>
                        Approve
                    </Button>
                    <Button basic color='red'>
                        Decline
          </Button>
                </div>
            </Card.Content>
        </Card>
    )

}

export default Appointment;
