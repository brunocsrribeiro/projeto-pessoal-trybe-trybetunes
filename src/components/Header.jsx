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

    this.setState({
      name: user.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h3
          data-testid="header-user-name"
        >
          { name }
        </h3>
      </header>
    );
  }
}

export default Header;
