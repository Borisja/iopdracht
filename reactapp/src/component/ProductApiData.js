import React, { Component } from 'React';

class ProductApiData extends Component{
    async componentDidMount(){
        const url = "localhost:8080/product/all";
        const response = await fetch(url);
        const allProductsData = await response.json();
        return allProductsData
    }
}

export {ProductApiData};