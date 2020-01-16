import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class AdminProducttsFormNew extends Component {

    api = "http://localhost:89/product";

    state = {
        id: 0,
        name: "",
        price: "",
        description: ""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submit() {
        axios.post(this.api, this.state).then(response => {
            this.props.history.push('/admin/products');
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <h2>Add new product</h2>
                <Form>
                    <Form.Group controlId="formBasicName" onChange={this.handleChange}>
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" placeholder="Product name" name="name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription" onChange={this.handleChange}>
                        <Form.Label>Product description</Form.Label>
                        <Form.Control type="text" placeholder="Product description" name="description" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrice" onChange={this.handleChange}>
                        <Form.Label>Product price</Form.Label>
                        <Form.Control type="text" placeholder="Product price" name="price" />
                    </Form.Group>
                </Form>
                <Button variant="success" size="lg" block onClick={() => this.submit()}>Add new product</Button>
            </div>
        )
    }

}

export default AdminProducttsFormNew