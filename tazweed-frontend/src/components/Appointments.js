import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Container, Input } from 'semantic-ui-react'
import Appointment from './Appointment'
import moment from 'moment'


function Appointments() {

    const { loading, data } = useQuery(FETCH_APPOINTMENTS_QUERY);
    const today = moment().format('dddd, MMMM Do')
    const year = moment().format('YYYY')

    if (data) console.log(data.appointments.edges);

    return (

            <Segment raised color="black">
                <Segment textAlign='right' raised color="orange" >
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <Grid.Row fluid>
                                <Header as='h2'>
                                    <Icon name='angle double left' />
                                    <Header.Content padded>
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
                        {loading ?
                            (<h1> Loading slots... <Icon loading name='spinner' /> </h1>
                            ) :
                            (data.appointments.edges && data.appointments.edges.map(({ node }) =>
                                <Grid.Column key={node.id}>
                                    <Appointment appointment={node} />
                                </Grid.Column>))}
                    </Grid.Row>
                </Grid>
            </Segment>


    )

}

export default Appointments;


const FETCH_APPOINTMENTS_QUERY = gql`
query{
    appointments(status_Iexact:"approved"){
        edges{
            node{
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
