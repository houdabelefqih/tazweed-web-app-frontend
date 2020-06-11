import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Container, Input } from 'semantic-ui-react'
import Request from './Request'
import moment from 'moment'


function Appointments() {

    const { loading, data } = useQuery(FETCH_REQUESTS_QUERY);

    return (

            <Segment raised color="black">

                <Segment textAlign='left' raised color="orange" >
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <Grid.Row fluid>
                                <Header as='h2'>
                                <Icon name='question' padded />

                                    <Header.Content padded>
                                        Requests
                                        <Header.Subheader></Header.Subheader>
                                    </Header.Content>
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

                    <Grid.Row fluid>
                        {loading ?
                            (<h1> Loading requets... <Icon loading name='spinner' /> </h1>
                            ) :
                            (data.appointments.edges && data.appointments.edges.map(({ node }) =>
                                <Grid.Column key={node.id}>
                                    <Request request={node} />
                                </Grid.Column>))}
                    </Grid.Row>
                </Grid>
            </Segment>

    )

}

export default Appointments;


const FETCH_REQUESTS_QUERY = gql`
query{
    appointments(status_Iexact:"pending"){
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
