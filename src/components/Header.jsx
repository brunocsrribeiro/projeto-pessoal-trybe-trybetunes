import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };

    this.userLog = this.userLog.bind(this);
  }

  componentDidMount() {
    this.userLog();
  }

  async userLog() {
    const user = await getUser();
    console.log(user);
    this.setState({
      name: user.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      loading ? (<Loading />) : (
        <header data-testid="header-component">
          <h3>{ name }</h3>
        </header>
      )
    );
  }
}

export default Header;
