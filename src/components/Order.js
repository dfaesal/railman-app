import React from "react";
import Menu from "./Menu.js";
import Payment from "./Payment.js"
import axios from "axios";

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderItems: [],
      orderTotal: 0,
      lastIndex: 0
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/c-orders")
      .then((response) => {
        this.setState({ lastIndex: response.data.length + 1 });
      })
      .catch((error) => {
        console.log(error);
    });
  }
  handleItemSelection = (item) => {
    this.setState(prevState => ({
      orderItems: [...prevState.orderItems, item],
      orderTotal: prevState.orderTotal + item.price,
    }));
  }

  handlePayment = (paymentInfo) => {
    //send paymentInfo to server
    console.log(paymentInfo);
    const url = window.location.href.split("/");
    const restaurant = url[url.length - 2];
    const orderItems = {
      "id": this.state.lastIndex,
      "restaurant": restaurant,
      "total": this.state.orderTotal,
      "status": "accepted"
    };
    axios.post("http://localhost:8000/api/c-orders", orderItems)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
    });
    
    this.props.history.push('/customer-dashboard');
  }

  render() {
    return (
      <div>
        <h2>Order</h2>
        <Menu items={this.props.items} handleItemSelection={this.handleItemSelection} />
        <Payment handlePayment={this.handlePayment} />
      </div>
    );
  }
}

export default Order;

  