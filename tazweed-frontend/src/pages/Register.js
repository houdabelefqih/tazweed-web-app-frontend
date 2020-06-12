import React, { useState, useContext } from 'react'
import {AuthContext} from '../context/Auth'

import { useMutation } from '@apollo/react-hooks'
import { Form,  Button } from 'semantic-ui-react'
import gql from 'graphql-tag'


function Register(props) {

    const context = useContext(AuthContext)

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        phone: '',
        seller: false,
        shop: '',
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })

    }

    const [addUser, { loading }] = useMutation(REGISTER_NEW_USER, {
        update(_, result) {
            context.login(result.data.login)
            props.history.push('/')
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        addUser()

    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className= {loading ? 'loading' : ''}>
                <h1> Register with Tazweed</h1>

                <Form.Input fluid
                    label='First name'
                    name='first_name'
                    value={values.first_name}
                    onChange={onChange}
                />

                <Form.Input fluid
                    label='Last name'
                    name='last_name'
                    value={values.last_name}
                    onChange={onChange}
                />

                <Form.Input fluid
                    label='Email'
                    name='email'
                    value={values.email}
                    onChange={onChange}
                />

                <Form.Input fluid
                    label='Username'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                />

                <Form.Input fluid
                    label='Password'
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                />

                <Form.Input fluid
                    label='Phone'
                    name='phone'
                    value={values.phone}
                    onChange={onChange}
                />

                <Form.Input
                    label='I am a seller'
                    type="checkbox"
                    name="seller"
                    checked={values.seller}
                    value={values.seller}
                    onChange={onChange}

                />



                <Form.Input fluid
                    label='Shop'
                    name='shop'
                    value={values.shop}
                    onChange={onChange}
                />


                <Button type="submit" color="blue" >Submit</Button>
            </Form>

        </div>
    )
}

export default Register;


const REGISTER_NEW_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!, $first_name: String!, $last_name: String!, $phone: String!, $seller: Boolean!, $shop: String!) {
    createUser(input: {username: $username, email: $email, password: $password, firstName: $first_name, lastName: $last_name, phone: $phone, isSeller: $seller, shop: $shop}) {
      user {
        id
        username
        firstName
        lastName
      }
    }
  }
  
`