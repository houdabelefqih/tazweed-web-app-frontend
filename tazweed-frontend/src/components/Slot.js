import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import clock from '../images/compass.png'
import moment from 'moment'
import DeleteButton from './DeleteButton'
import { withRouter } from 'react-router-dom';


function Slot({slot}) {
    const { uuid, date, start, end, available } = slot
    const slot_time = moment(start, 'HH:mm:ss').format("HH:mm") + ' - ' + moment(end, 'HH:mm:ss').format("HH:mm ");
    const card_color = available ? "green" : "red"

    return (

        <div>

            <Card available color={card_color} fluid style={{ marginBottom: 30 }}>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={clock}
                    />
                    <Card.Header> {slot_time}</Card.Header>
                    <Card.Meta>{date} {uuid}</Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    <DeleteButton isSlot uuid={uuid}/>
                </Card.Content>

            </Card>

        </div>
    )

}

export default withRouter(Slot);




