import React, { useContext, useState } from 'react'
import { Card, Button, Image, Icon, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/Auth'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {FETCH_SLOTS_QUERY} from '../util/graphql'
import { withRouter } from 'react-router-dom';




function DeleteButton(props) {

  const mutation = props.isSlot ? DELETE_SLOT : DELETE_APPOINTMENT;

  const [deleteMutation] = useMutation(mutation, {
    update(proxy) {
        const data = proxy.readQuery({
          query: FETCH_SLOTS_QUERY
        });

        proxy.writeQuery({ query: FETCH_SLOTS_QUERY, data });
      

        props.history.push('/')
    },
    variables: {
      slotUuid: props.uuid , 
    }
  });

    return (
        <Button onClick={deleteMutation} size="small" icon basic color="red">
            <Icon name="trash alternate" color="red"
            />
        </Button>
    )
}

export default withRouter(DeleteButton);



const DELETE_SLOT = gql`
    mutation DeleteSlot($slotUuid: UUID!) {
        deleteSlot(input: {slotUuid: $slotUuid}) {
          deleted
        }
      }

    `
const DELETE_APPOINTMENT= gql`
    mutation DeleteAppointment($appointmentUuid: UUID!) {
      deleteAppointment(input: {appointmentUuid: $appointmentUuid}) {
        deleted
      }
    }


`
