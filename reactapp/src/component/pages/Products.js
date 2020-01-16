import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import image1 from "../img/1.jpg";
class Products extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount(){
        fetch('http://localhost:8080/product/all').then(res => res.json()).then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        })
    }

    placeOrder(item){
        console.log(item)
    }
    
    render(){
        var { isLoaded, items } = this.state;

        if(!isLoaded){
            return <div>Loading...</div>;
        } else {
            return(
                <ul>                    
                    {items.map(item => (
                       <Card style={{ width: '18rem', display: 'inline-block'}}>
                       <Card.Img variant="top" src={image1} />
                       <Card.Body>
                         <Card.Title>{item.name}</Card.Title>
                         <Card.Text>
                             {item.description}
                             <br></br>
                             {item.price}
                         </Card.Text>
                         <Button variant="primary" onClick={() => this.placeOrder(item)}>Order</Button>
                       </Card.Body>
                     </Card>
                    ))}
                </ul>                
            )
        }
        
    }

}

export default Products