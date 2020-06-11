import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Container, Input } from 'semantic-ui-react'

function Profile() {

    const { loading, data } = useQuery(FETCH_USER_QUERY);

    return (

            <Segment raised color="black">

                <Segment textAlign='left' raised color="orange" >
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <Grid.Row fluid>
                                <Header as='h2'>
                                <Icon name='user' padded />

                                    <Header.Content padded>
                                        Profile
                                        <Header.Subheader></Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Grid.Row >
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>


                </Segment>

                <Grid padded columns={3}>

                    <Grid.Row fluid>
                        {loading ?
                            (<h1> Loading profile information... <Icon loading name='spinner' /> </h1>
                            ) :
                            (data.users.edges && data.users.edges.map(({ node }) =>
                                <Grid.Column key={node.id}>
                                    {node.username}
                                    {node.firstName}
                                    {node.lastName}
                                </Grid.Column>))}
                    </Grid.Row>
                </Grid>
            </Segment>

    )

}

export default Profile;


const FETCH_USER_QUERY = gql`
query{
    users(firstName_Iexact:"hakim"){
        edges{
            node{
                id
                username
                firstName
                lastName
                email
                phone
                isSeller
                
                }
                

            
        }
    }
}

`;
