import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FetchProduct extends Component {
    static displayName = "Products";

    constructor() {
        super();
        this.state = { products: [], loading: true}
    }

    componentDidMount() {
        this.SeedingProducts();
    }

    static handleEdit(id) {
        window.location.href = "/product/edit/" + id;
    }


    static handleDelete(id) {
        if (!window.confirm("You wish remove this product? Product Id : " + id)) {
            return;
        }
        else {
            fetch("api/products/" + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-product";
                    alert('Removed with Successed');
                })
        }
        window.location.href = "/product/edit/" + id;
    }

    static renderProductsTable(products) {

        return (
            <table className="table table-striped" aria-aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod =>
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.description}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(prod.id)}>Update</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(prod.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... </em> </p>
            : FetchProduct.renderProductsTable(this.state.products);

        return (
            <div>
                <h1 id="tableLabel">Products</h1>
                <p>Screen of products listing</p>
                <p>
                    <Link to="/add-product" >Create Product</Link>
                </p>
                {contents}
            </div>
            );
    }

    async SeedingProducts() {
        const response = await fetch('api/Products');
        const data = await response.json();
        this.setState({ products: data, loading: false })
    }
}