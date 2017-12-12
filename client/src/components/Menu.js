import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Segment, 
  Header, 
  Dimmer, 
  Loader,
  List,
} from 'semantic-ui-react';
import ProductForm from './ProductForm';
import axios from 'axios';

class Menu extends Component {
  state = { products: [] };

  componentDidMount() {
    axios.get('/api/products')
      .then( res => {
        this.setState({ products: res.data })
      })
      .catch( err => {
        // TODO: handle client errors better, probably with a flash message
        console.log(err);
    });
  }

  displayProducts = () => {
    // Manual Map Way
    // let productsArray = [];
    // this.state.products.forEach( product => {
    //   productsArray.push(<div>{product.name}</div>)
    // });
    // return productsArray;

    return this.state.products.map( product => {
      return(
        <List.Item>
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </List.Item>
      )
    });
  }

  productsLoader() {
    return(
      <Dimmer active style={styles.dimmer}>
        <Loader>Loading Products...</Loader>
      </Dimmer>
    )
  }

  addProduct = (product) => {
    this.setState({ products: [product, ...this.state.products] });
  }

  render() {
    return(
      <Segment basic>
        <ProductForm addProduct={this.addProduct} />
        { this.state.products.length > 0 ?
          <List>
            {this.displayProducts()}
          </List> :
          this.productsLoader() 
        }
      </Segment>
    )
  }
}

const styles = {
  dimmer: {
    height: '100vh',
  },
}

export default Menu;