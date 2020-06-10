import React from 'react'
import { Card, Button, } from 'semantic-ui-react'
import moment from 'moment'

function Slot(props) {
    const { date, start, end, available } = props.slot

    return (
        <Card>
            <Card.Content>
    <Card.Header>{start} - {end}</Card.Header>
    <Card.Meta>{date}</Card.Meta>

            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='red'>
                        Delete
          </Button>
                </div>
            </Card.Content>
        </Card>
    )

}

export default Slot;


