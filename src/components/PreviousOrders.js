import React, { Component } from 'react';
import axios from 'axios';

class PreviousOrders extends Component {
  state = {
    orders: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/orders')
      .then(res => {
        this.setState({ orders: res.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { orders } = this.state;
    return (
      <fieldset>
        <legend>All Previous Orders</legend>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Restaurant</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                (order.status === 'rejected' || order.status === 'delivered') &&
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.restaurant}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
          <h2>No orders</h2>
        )}
      </fieldset>
    );
  }
}

export default PreviousOrders;
