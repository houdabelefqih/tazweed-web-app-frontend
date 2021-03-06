import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Input, Message} from 'semantic-ui-react'
import Request from '../components/Request'

import { AuthContext } from '../context/Auth'



function Requests() {

    const { user } = useContext(AuthContext)


    const { loading, data } = useQuery(FETCH_REQUESTS_QUERY);

    const requests = user ? (<Segment raised color="black">
        <Segment textAlign='left' raised color="orange" >
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    <Grid.Row>
                        <Header as='h2'>
                            <Icon name='question' />

                            <Header.Content>
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

            <Grid.Row>
                {loading || !data ?
                    (<h3> Loading requests... <Icon loading name='spinner' /> </h3>
                    ) :
                    (data.appointments.edges && data.appointments.edges.map(({ node }) =>
                        <Grid.Column key={node.id}>
                            <Request request={node} />
                        </Grid.Column>))}
            </Grid.Row>
        </Grid>
    </Segment>) : (<Segment raised color="black">


        <Message negative size="big">
            <Message.Header> You are not logged in.</Message.Header>
        </Message>

    </Segment>);







    return requests;

}

export default Requests;


const FETCH_REQUESTS_QUERY = gql`
query{
    appointments(status_Iexact:"pending", orderBy: "slot__start"){
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
