import React, { Component } from 'react';


export class Product {
    constructor() {
        this.id = 0;
        this.description = "";
    }
}

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", product: new Product(), loading: true };
        this.initialize()

        this.handlerCancel = this.handlerCancel.bind(this);
        this.handlerSave = this.handlerSave.bind(this);
    }

    async initialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Products/' + id);
            const data = await response.json();
            this.setState({ title: "Update Product", product: data, loading: false });
        }
        else {
            this.state = { title: "Create Product", product: new Product(), loading: false };
        }

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>{Product}</h3>
                {contents}
            </div>
            );
    }

    handlerCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-product");
    }

    handlerSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.product.id > 0) {
            const response1 = fetch('api/products/' + this.state.product.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-product');
        }
        else {
            const response2 = fetch('api/products/', { method: 'POST', body: data });
            this.props.history.push('/fetch-product');
        }
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handlerSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.product.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="description" defaultValue={this.state.product.description} required />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.product.id}>Save</button>
                    <button className="btn btn-danger" onClick={this.handlerCancel}>Cancel</button>
                </div>
            </form>
            );
    }
}