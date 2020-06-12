import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Button } from 'semantic-ui-react'
import { AuthContext } from '../context/Auth'
import gql from 'graphql-tag'


function Login(props) {
    const context = useContext(AuthContext)

    const [errors, setErrors] = useState();

    const [values, setValues] = useState({
        username: '',
        password: '',

    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })

    }

    const [logUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.tokenAuth)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].message)
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        logUser()

    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>

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

                <Button type="submit" color="blue" >GO</Button>
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

export default Login;


const LOGIN_USER = gql`
mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
    }
  }
  
`

const FETCH_USER = gql`
mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
        token
    }
  }
  
`