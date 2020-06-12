import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Message, Card } from 'semantic-ui-react'

function Profile() {

    const { user } = useContext(AuthContext)

    const { loading, data } = useQuery(FETCH_USER_QUERY);

    const profile = user ? (<Segment raised color="black">

        <Segment textAlign='left' raised color="orange" >
            <Grid columns={2} relaxed='very'>
                <Grid.Column>
                    <Grid.Row>
                        <Header as='h2'>
                            <Icon name='user' />

                            <Header.Content>
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

            <Grid.Row>
                {loading || !data ?
                    (<h3> Loading profile information... <Icon loading name='spinner' /> </h3>
                    ) :

                    <Grid.Column key={data.user.id}>
                        <h3>First name: </h3>
                        <Card fluid color="orange" header={data.user.firstName}/>
                        <h3>Last name: </h3>
                        <Card fluid color="black" header={data.user.lastName} />
                        <h3>Username: </h3>
                        <Card fluid color="orange" header={data.user.username} />
                        <h3>Email: </h3>
                        <Card fluid color="black" header={data.user.email} />
                        <h3>Phone: </h3>
                        <Card fluid color="orange" header={data.user.phone} />
                    </Grid.Column>}
            </Grid.Row>
        </Grid>
    </Segment>
    ) : (<Segment raised color="black">


        <Message negative size="big">
            <Message.Header> You are not logged in.</Message.Header>
        </Message>

    </Segment>);


    return profile;

}

export default Profile;


const FETCH_USER_QUERY = gql`
query{
    user{
       
        id
        username
        firstName
        lastName
        email
        phone
        isSeller
                

    }
}

`;
