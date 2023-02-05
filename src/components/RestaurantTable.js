import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class RestaurantTable extends React.Component {
  state = {
    items: {}
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/menuItems')
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { restaurants } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Cuisine</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>
                <Link to={{
                  pathname: "/restaurant/" + restaurant.name + "/menu",
                  state: { items: this.state.items[restaurant.name] }
                }}>{restaurant.name}</Link>
              </td>
              <td>{restaurant.location}</td>
              <td>{restaurant.cuisine}</td>
              <td>{restaurant.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default RestaurantTable;  