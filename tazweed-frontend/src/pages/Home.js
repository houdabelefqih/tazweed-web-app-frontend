import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid, Icon, Header, Segment, Button, GridColumn, Message, Modal } from 'semantic-ui-react'
import Slot from '../components/Slot'
import SlotForm from '../components/SlotForm'

import moment from 'moment'
import { AuthContext } from '../context/Auth'



function Home() {
    const { user } = useContext(AuthContext)

    const { loading, data } = useQuery(FETCH_SLOTS_QUERY);
    const today = moment().format('dddd, MMMM Do')
    const year = moment().format('YYYY')

    const home = user ? (
        <Segment raised color="black">

            <Segment textAlign='right' raised color="orange">
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
                    <GridColumn textAlign="right">
                        <Grid.Row >

                            <Modal closeIcon size="tiny" trigger={<Button color='black' icon='add' content='add slot' />}>
                                <Modal.Header>Add new slot</Modal.Header>
                                <Modal.Content >
                                        <SlotForm />
                                </Modal.Content>
                            </Modal>

                        </Grid.Row>
                    </GridColumn>

                </Grid>


            </Segment>

            <Grid padded columns={3}>

                <Grid.Row>
                    {loading || !data ?
                        (<h3> Loading slots... <Icon loading name='spinner' /> </h3>
                        ) :
                        (data.slots.edges && data.slots.edges.map(({ node }) =>
                            <Grid.Column key={node.id}>
                                <Slot slot={node} />
                            </Grid.Column>))}
                </Grid.Row>
            </Grid>
        </Segment>



    ) : (
            <Segment raised color="black">


                <Message negative size="big">
                    <Message.Header> You are not logged in.</Message.Header>
                </Message>

            </Segment>

        );
    return home;

}




export default Home;


const FETCH_SLOTS_QUERY = gql`
query{
    slots(orderBy : "start"){
        edges{
            node{
                id
                date
                start
                end
                available

            }
        }
    }
}

`;

