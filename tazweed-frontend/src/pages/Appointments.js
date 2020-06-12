import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Input, Message } from 'semantic-ui-react'
import Appointment from '../components/Appointment'
import moment from 'moment'

import { AuthContext } from '../context/Auth'


function Appointments() {

    const { user } = useContext(AuthContext)

    const { loading, data } = useQuery(FETCH_APPOINTMENTS_QUERY);
    const today = moment().format('dddd, MMMM Do')
    const year = moment().format('YYYY')

    const appointments = user ? (<Segment raised color="black">
        <Segment textAlign='right' raised color="orange" >
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    <Grid.Row>
                        <Header as='h2'>
                            <Icon name='angle double left' />
                            <Header.Content>
                                {today}
                                <Header.Subheader>{year}</Header.Subheader>
                            </Header.Content>
                            <Icon name='angle double right' />
                        </Header>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Grid.Row >
                        <Input icon='search' placeholder='Search...' />
                    </Grid.Row>
                </Grid.Column>
            </Grid>


        </Segment>

        <Grid padded columns={3}>

            <Grid.Row>
                {loading || !data ?
                    (<h3> Loading appointments... <Icon loading name='spinner' /> </h3>
                    ) :
                    (data.appointments.edges && data.appointments.edges.map(({ node }) =>
                        <Grid.Column key={node.id}>
                            <Appointment appointment={node} />
                        </Grid.Column>))}
            </Grid.Row>
        </Grid>
    </Segment>

    ) : (<Segment raised color="black">


        <Message negative size="big">
            <Message.Header> You are not logged in.</Message.Header>
        </Message>

    </Segment>);

    return appointments;

}

export default Appointments;


const FETCH_APPOINTMENTS_QUERY = gql`
query{
    appointments(status_Iexact:"approved" orderBy: "slot__start"){
        edges{
            node{
                id
                uuid
                slot{
                    uuid
                    date
                    start
                    end
                    available
                }

                client{
                    id
                    user{
                        id
                        username
                        firstName
                        lastName
                        email
                        phone
                    }
                }

                seller{
                    id
                    user{
                        id
                        username
                        firstName
                        lastName
                        email
                        phone
                    }
                shop

                }
                status
            }
        }
    }
}

`;
