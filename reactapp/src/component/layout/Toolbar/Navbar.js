import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  state = {
    loggedIn: false
}

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.setState({loggedIn: true})
    } else {
      this.setState({loggedIn: false})
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.checkLogin();
    alert('You have been logged off.');
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link text-white text-uppercase ml-5" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white text-uppercase ml-5" to="/admin/products">Products</Link>
              </li>
              <li className="nav-item">
                <div className="nav-link text-white text-uppercase ml-5" onClick={() => this.logout()}>Logout</div>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link text-white text-uppercase ml-5" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white text-uppercase ml-5" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white text-uppercase ml-5" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
}

export default NavBar;