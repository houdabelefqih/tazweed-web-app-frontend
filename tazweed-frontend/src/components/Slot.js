import React from 'react'
import { Card, Button, Icon, Image } from 'semantic-ui-react'
import clock from '../images/compass.png'

function Slot(props) {
    const { date, start, end, available } = props.slot

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={clock}
                />
                <Card.Header>{start} - {end}</Card.Header>
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


