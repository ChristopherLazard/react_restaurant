import React, { Component } from 'react';
import { Segment, Form, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductForm extends Component {
  state = { product: { name: '', description: '', price: '' } };

  componentDidMount() {
    const match = this.props.match;

    if(match)
      axios.get(`/api/menus/${match.params.id}`)
        .then( res => {
          this.setState({ product: res.data });
        })
        .catch( err => {
          console.log(err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let baseUrl = '/api/menus';
    const { id, name, description, price, department } = this.state.product;
    baseUrl = id ? `${baseUrl}/${id}` : baseUrl;
    // strong params
    const params = { product: { name, description, department, price } }

    if(id)
      axios.put(baseUrl, params)
        .then(res => {
          this.props.history.push(`/menus/${id}`);
        })
        .catch( err => {
          console.log(err);
      });
    else
      axios.post(baseUrl, params)
        .then(res => {
          this.setState({ product: { name: '', price: '', description: '' }});
          this.props.addProduct(res.data);
        })
        .catch( err => {
          console.log(err);
      })
  }

  handleChange = (e) => {
    const { id, value } = e.target;

    this.setState({ product: {...this.state.product, [id]: value } })
  }

  cancelButton = () => {
    const { id } = this.state.product;

    if(id)
      return(<Button as={Link} to={`/products/${id}`}>Cancel</Button>)
  }

  render() {
    const { name, price, description, department } = this.state.product;

    return(
      <Form onSubmit={this.handleSubmit}>
        <Label>Product Name:</Label>
        <Form.Input value={name} id='name' onChange={this.handleChange} />

        <Label>Product Price:</Label>
        <Form.Input value={price} id='price' onChange={this.handleChange} />
        
        <Label>Product Description:</Label>
        <Form.Input value={description} id='description' onChange={this.handleChange} />

        <Label>Product Department:</Label>
        <Form.Input value={department} id='department' onChange={this.handleChange} />

        { this.cancelButton() }
        <Button primary type='submit'>Save</Button>
      </Form>
    );
  }
}

export default ProductForm;