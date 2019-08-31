import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./redux/store";
import { userLoggedIn, logoutUser } from "./redux/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import About from "./components/about";
import Locations from "./components/locations";
import Products from "./components/products";
import Dashboard from "./components/dashboard";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/Navbar";

import "./custom.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/locations" component={Locations} />
            <Route path="/products" component={Products} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Provider>
    );
  }
}
export default App;
