

import React from 'react'
import { Card, Button,} from 'semantic-ui-react'
import moment from 'moment'
import { Link }  from 'react-router-dom'



function Request(props) {
    const { slot, client, seller} = props.request;
    const slot_time = moment(slot.start, 'HH:mm:ss').format("HH:mm") + ' - ' + moment(slot.end, 'HH:mm:ss').format("HH:mm ");


    return (
        <Card fluid style={{marginBottom : 30}}>
            <Card.Content floated='center'>
                <Card.Header as={Link} to={`/profile/${client.id}`}>{client.user.firstName} {client.user.lastName}</Card.Header>
                <Card.Meta>{slot_time}</Card.Meta>
                <Card.Description>
                    @ {seller.shop}
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

export default Request;
