import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {
  Container,
  Header,
  Input,
  Button,
  Message,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    company: "",
    username: "",
    password: "",
    errors: {},
    showError: false
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, showError: false, errors: {} });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, company, username, password } = this.state;
    if (name === "" || email === "" || username === "" || password === "") {
      this.setState({
        errors: { msg: "All fields are mandatory" },
        showError: true
      });
    } else {
      const newUser = {
        name: name,
        username: username,
        email: email,
        password: password,
        company: company
      };

      this.props.registerUser(newUser, this.props.history);
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, showError: true });
    }
  }

  render() {
    const {
      name,
      email,
      company,
      username,
      password,
      errors,
      showError
    } = this.state;

    return (
      <div>
        <Container>
          <Grid.Column
            style={{
              marginLeft: 300,
              marginTop: 100,
              marginRight: 300,
              marginBottom: 100
            }}
          >
            <Header
              style={{ marginTop: 10, color: "#000" }}
              as="h1"
              size="huge"
            >
              Sign up
            </Header>
            <Container
              style={{ marginTop: 30, marginBottom: 5 }}
              textAlign="left"
            >
              <Header as="h4" style={{ color: "#000" }}>
                Create new account
              </Header>
              <Input
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={this.onChange}
                fluid
              />
              <Input
                style={{ marginTop: 10 }}
                placeholder="Company"
                name="company"
                value={company}
                onChange={this.onChange}
                fluid
              />
              <Input
                style={{ marginTop: 10 }}
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.onChange}
                fluid
              />
              <Input
                style={{ marginTop: 10 }}
                placeholder="Email"
                name="email"
                value={email}
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
                  zIndex: 10000,
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor: "#f05f40"
                }}
                onClick={this.onSubmit}
                positive
                fluid
              >
                Sign up
              </Button>
              {errors && errors.msg && showError && (
                <Message negative>
                  <p>{errors.msg}</p>
                </Message>
              )}
              <div className="hs-intro" style={{ textAlign: "center" }}>
                Alreay a user ? &nbsp; <Link to="/"> Sign In </Link>
              </div>
            </Container>
          </Grid.Column>
        </Container>
      </div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));
