import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Button, Label } from 'semantic-ui-react'
import { TimeInput, DateInput } from 'semantic-ui-calendar-react';



import { AuthContext } from '../context/Auth'
import gql from 'graphql-tag'


function SlotForm(props) {
    const context = useContext(AuthContext)
    console.log(context.user)

    const [errors, setErrors] = useState();

    const [values, setValues] = useState({
        date: '',
        start: '',
        end: '',

    })

    const onChange = (event, data) => {
        setValues({ ...values, [data.name]: data.value })

    }

    const [createSlot, { loading }] = useMutation(CREATE_SLOT, {
        update(_, result) {
            props.history.push('/')
        },
        onError(err) {           
           // setErrors(err.graphQLErrors[0].message)
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        createSlot()

    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <Form.Input>
                    <DateInput
                        label="Date"
                        name="date"
                        dateFormat= "YYYY-MM-DD"
                        value={values.date}
                        iconPosition="right"
                        onChange={onChange}
                        closable
                    />
                </Form.Input>

                <Form.Input>
                    <TimeInput
                        label="Start time"
                        name="start"
                        placeholder="start time"
                        value={values.start}
                        iconPosition="right"
                        onChange={onChange}
                        closable />

                </Form.Input>

                <Form.Input>
                    <TimeInput
                        label="End time"
                        name="end"
                        placeholder="end time"
                        value={values.end}
                        iconPosition="right"
                        onChange={onChange}
                        closable />

                </Form.Input>


    <Button type="submit" color="blue" >ADD</Button>
            </Form>

            {errors && (
                <div className="ui error message">
                    <ul className="list">
                        {errors}
                    </ul>
                </div>
            )}

        </div>
    )
}

export default SlotForm;


const CREATE_SLOT = gql`
mutation CreateSlot($date: Date!, $start: Time!, $end: Time!) {
    createSlot(input: {date: $date, start: $start, end: $end}) {
      slot {
        id
        uuid
        available
        date
        start
        end
      }
    }
  }
  
  
`