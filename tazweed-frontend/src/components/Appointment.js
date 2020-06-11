import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'
import calendar from '../images/calendar.png'
import moment from 'moment'
import { Link }  from 'react-router-dom'



function Appointment(props) {
    const { slot, client, seller} = props.appointment;
    const slot_time = moment(slot.start, 'HH:mm:ss').format("HH:mm") + ' - ' + moment(slot.end, 'HH:mm:ss').format("HH:mm ");


    return (
        <Card fluid style={{marginBottom : 30}}>
            <Card.Content floated='center'>
                <Image
                    floated='right'
                    size='mini'
                    src={calendar}
                />
                <Card.Header as={Link} to={`/profile/${client.id}`}>{client.user.firstName} {client.user.lastName}</Card.Header>
                <Card.Meta>{slot_time}</Card.Meta>
                <Card.Description>
                    @ {seller.shop}
                </Card.Description>

            </Card.Content>
            <Card.Content extra>
                <Button negative fluid>
                    Delete
          </Button>
            </Card.Content>
        </Card>
    )

}

export default Appointment;
