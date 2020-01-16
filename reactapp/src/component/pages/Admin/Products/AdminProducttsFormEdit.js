import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AdminProducttsFormEdit extends Component {
    data = this.props.location

    api = "http://localhost:89/product/";

    state = {
        isLoaded: false,
        id: 0,
        name: "",
        price: "",
        description: ""
    }

    getToken(){
        return localStorage.getItem('token');
    }

    componentDidMount() {
        if (this.data.data >= 0) {
            fetch(this.api + this.data.data).then(res => res.json()).then(json => {
                this.setState({
                    isLoaded: true,
                    id: json.id,
                    name: json.name,
                    price: json.price,
                    description: json.description
                })
            })
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submit() {
        axios.put(this.api + this.state.id, this.state, {headers:{
            'authorization' : this.getToken(),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }}).then(response => {
            this.props.history.push('/admin/products');
        }).catch(error => {
            alert("Error code: " + error.response.status + ", " + error.response.data.error);
        })
    }

    render() {
        var { isLoaded } = this.state;

        if (!this.data.data) {
            return <Redirect to='/admin/products' />
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h2>Edit product</h2>
                    <Form>
                        <Form.Group controlId="formBasicName" onChange={this.handleChange}>
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Product name" name="name" defaultValue={this.state.name} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription" onChange={this.handleChange}>
                            <Form.Label>Product description</Form.Label>
                            <Form.Control type="text" placeholder="Product description" name="description" defaultValue={this.state.description} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrice" onChange={this.handleChange}>
                            <Form.Label>Product price</Form.Label>
                            <Form.Control type="text" placeholder="Product price" name="price" defaultValue={this.state.price} onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                    <Button variant="success" size="lg" block onClick={() => this.submit()}>Edit product</Button>
                </div>
            )
        }
    }

}

export default AdminProducttsFormEdit