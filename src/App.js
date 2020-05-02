import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import throttle from "lodash/throttle";
import store from "./redux/store";

import About from "./components/about";
import Locations from "./components/locations";
import Products from "./components/products";
import Dashboard from "./components/dashboard";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/Navbar";
import { userLoggedIn } from "./redux/actions/authActions";
import { saveState, loadState, getToken } from "./utils/localStorage";
import "./custom.css";

store.subscribe(
  throttle(() => {
    saveState({ auth: store.getState().auth });
  }, 1000)
);

class App extends Component {
  componentDidMount() {
    if (getToken()) {
      const persistedState = loadState();
      if (persistedState && persistedState.auth.isAuthenticated) {
        store.dispatch(userLoggedIn(persistedState.auth));
      }
    }
  }
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
