import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Container, Divider } from 'semantic-ui-react'
import Appointment from './Appointment'
import moment from 'moment'


function Appointments() {

    const { loading, data } = useQuery(FETCH_APPOINTMENTS_QUERY);
    const today = moment().format('dddd, MMMM Do')
    const year = moment().format('YYYY')

    if (data) console.log(data.appointments.edges);

    return (

        <Segment padded raised color= "orange">
            <Grid columns={2} relaxed='very'>
                <Grid.Column>

                    <Grid columns={2} padded>

                        <Grid.Row fluid>

                            <Segment color='orange'>
                                <Header as='h2'>
                                    <Icon name='angle double left' />
                                    <Header.Content>
                                        {today}
                                        <Header.Subheader>{year}</Header.Subheader>
                                    </Header.Content>
                                    <Icon name='angle double right' />
                                </Header>
                            </Segment>


                        </Grid.Row>

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
                </Grid.Column>
                <Grid.Column>

                    <Grid columns={1} padded divided inverted centered>

                        <Grid.Row stretched>
                                <Header as='h2'>
                                    <Icon name='question' />
                                    <Header.Content>
                                        Requests
                                    </Header.Content>
                                </Header>


                        </Grid.Row>

                        <Grid.Row>
                            {loading ?
                                (<h1> Loading slots... <Icon loading name='spinner' /> </h1>
                                ) :
                                (data.appointments.edges && data.appointments.edges.map(({ node }) =>
                                

                                    <Grid.Column floated= 'center' padded key={node.id}>
                                        <Appointment appointment={node} />
                                    </Grid.Column>)
                                    )}
                        </Grid.Row>

                    </Grid>

                
                </Grid.Column>
            </Grid>

            <Divider vertical></Divider>
        </Segment>





    )

}

export default Appointments;


const FETCH_APPOINTMENTS_QUERY = gql`
query{
    appointments{
        edges{
            node{
                id
                slot{
                    date
                    start
                    end
                    available
                }

                client{
                    user{
                        firstName
                        lastName
                        email
                    }
                }

                seller{
                    user{
                        firstName
                        lastName
                        email
                    }
                shop

                }
                status
                

            }
        }
    }
}

`;
