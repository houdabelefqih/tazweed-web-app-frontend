import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import Slot from './Slot'


function Home(){

    const {loading, data} = useQuery(FETCH_SLOTS_QUERY);

    if (data) console.log(data.slots.edges);

    return (

          <Grid columns={3}>
            <Grid.Row>
                <h1> Slots here </h1>
            </Grid.Row>
        
            <Grid.Row>
                {loading ? 
                    (<h1> Loading slots...</h1> ) : 
                    (data.slots.edges && data.slots.edges.map(({node}) =>   
                        <Grid.Column key={node.id}>   
                            <Slot slot= {node}/>
                        </Grid.Column> ))}
            </Grid.Row>
          </Grid>
        )
        
}

export default Home;


const FETCH_SLOTS_QUERY= gql`
query{
    slots{
        edges{
            node{
                date
                start
                end
                available

            }
        }
    }
}

`;