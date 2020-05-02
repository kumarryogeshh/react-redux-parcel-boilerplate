import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, showError: true });
    }
  }
  render() {
    return <div className="ui container">Dashboard</div>;
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth, errors: state.errors, user: state.auth.user };
};

export default connect(mapStateToProps, { loginUser })(withRouter(Dashboard));
