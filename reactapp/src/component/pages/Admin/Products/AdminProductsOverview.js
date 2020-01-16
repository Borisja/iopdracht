import React, { Component } from 'react'
import { Table, Button } from "react-bootstrap";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import image1 from "../../../img/1.jpg";

class AdminProductsOverview extends Component {

    api = "http://localhost:89/product";

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            addModalShow: false,
            editItem: [],
        }
    }

    componentDidMount() {
        fetch(this.api).then(res => res.json()).then(json => {
            this.setState({
                isLoaded: true,
                items: json,
                isOpen: false
            })
        })
    }

    placeOrder(id) {
        console.log(id);
    }

    editItem(item) {
        console.log("return?");
        return <Redirect to="/" />;
    }

    deleteItem(item) {
        axios.delete(this.api + '/' + item.id).then(response => {
            this.componentDidMount();
        }).catch(error => {
            alert("Error code: " + error.response.status + ", " + error.response.data.error);
        })
    }

    newProduct() {
        console.log("click");
        this.context.router.push('/sample');
    }

    render() {
        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Link to="/admin/products/new">
                        <Button variant="success" size="lg" block >Add new product</Button>
                    </Link>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product name</th>
                                <th>Product description</th>
                                <th>Product price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Link to={{
                                            pathname: "/admin/products/edit",
                                            data: item.id
                                        }}>
                                            <Button variant="warning">Edit</Button>
                                        </Link>{"        "}
                                        <Button variant="danger" onClick={() => this.deleteItem(item)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        }

    }

}

export default AdminProductsOverview