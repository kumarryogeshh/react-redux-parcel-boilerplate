import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Header,
  Input,
  Button,
  Message,
} from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";

class Login extends Component {
  state = {
    username: "lms-admin",
    password: "123456",
    errors: {},
    showError: false,
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, showError: true });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, showError: false, errors: {} });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === "" || password === "") {
      this.setState({
        errors: { msg: "All fields are mandatory" },
        showError: true,
      });
    } else {
      this.props.loginUser({ username, password });
    }
  };

  render() {
    const { username, password, errors, showError } = this.state;
    return (
      <div style={{ marginTop: 30 }}>
        <Container>
          <Grid.Column
            style={{
              marginLeft: 300,
              marginTop: 100,
              marginRight: 300,
              marginBottom: 100,
            }}
          >
            <Grid.Row>
              <Header as="h1" size="huge" style={{ color: "#000" }}>
                Sign In
              </Header>
              <Header as="h4" style={{ color: "#fff" }}>
                Enter your username and password
              </Header>
              <Input
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.onChange}
                fluid
              />
              <Input
                style={{ marginTop: 10 }}
                onChange={this.onChange}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                fluid
              />
              <Button
                size="big"
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor: "#f05f40",
                }}
                onClick={this.onSubmit}
                positive
                fluid
              >
                Sign in
              </Button>
              <div className="hs-intro" style={{ textAlign: "center" }}>
                New to us ?&nbsp;
                <Link to="/signup"> Sign Up </Link>
              </div>
            </Grid.Row>
            {errors && errors.msg && showError && (
              <Message negative>
                <p>{errors.msg}</p>
              </Message>
            )}
          </Grid.Column>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
