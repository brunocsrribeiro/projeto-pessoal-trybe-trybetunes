import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onHandleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  async onHandleClick() {
    const { name } = this.state;
    this.setState(() => ({ loading: true }));
    await createUser({ name });

    this.setState(() => ({ loading: false, redirect: true }));
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minLength = 3;
    const lengthNameUser = name.length < minLength;

    if (redirect) return <Redirect to="/search" />;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <h2>LOGIN</h2>
        <form>
          <label htmlFor="login-name">
            <input
              type="text"
              name="name"
              id="login-name"
              data-testid="login-name-input"
              onChange={ this.onHandleChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ lengthNameUser }
              onClick={ this.onHandleClick }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
