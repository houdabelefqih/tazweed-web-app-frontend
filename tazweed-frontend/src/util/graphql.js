import gql from 'graphql-tag';

export const FETCH_SLOTS_QUERY = gql`
query{
    slots{
        edges{
            node{
                id
                uuid
                date
                start
                end
                available

            }
        }
    }
}

`;
