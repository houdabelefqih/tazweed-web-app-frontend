import React from 'react'
import { Card, Button, Icon, Image } from 'semantic-ui-react'
import clock from '../images/compass.png'
import moment from 'moment'



function Slot(props) {
    const { date, start, end, available } = props.slot
    const slot_time = moment(start, 'HH:mm:ss').format("HH:mm") + ' - ' + moment(end, 'HH:mm:ss').format("HH:mm ");

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={clock}
                />
                <Card.Header> {slot_time}</Card.Header>
                <Card.Meta>{date}</Card.Meta>

            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button negative>
                        Delete
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )

}

export default Slot;


