import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class Login extends Component {

    api = "http://localhost:89/login"

    state = {
        email: "",
        pw: ""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    submit() {
        axios.post(this.api, this.state).then(res => {
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/admin/products');
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                <h2>User login</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail" onChange={this.handleChange}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" name="email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" onChange={this.handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" name="pw" />
                    </Form.Group>
                </Form>
                <Button variant="success" size="lg" block onClick={() => this.submit()}>Login</Button>
            </div>
        )
    }
}

export default Login