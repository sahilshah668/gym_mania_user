import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();

  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
    <div>
  <div className="icon-bar">
  <h3 className="display-5 text-center">GYM_MANIA</h3>
  </div>   
<div className="icon-bar">
  <Link to="/dashboard">
  <i className="fa fa-home"></i>
  </Link>
  <Link to="/profiles">
  <i className="fa fa-search"></i>
  </Link> 
  <Link to="/feed">
  <i className="fa fa-rss"></i>
  </Link> 
  
   <Link to="profile">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '37px', marginRight: '5px', marginBottom: '2px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
          
          </Link>

          <Link   onClick={this.onLogoutClick.bind(this)} to="/login">
          <i className="fas fa-sign-out-alt"></i>        
          </Link>
  
   
           
</div>
</div>
    );

    const guestLinks = (
      
      <nav className="navbar navbar-expand-sm   mb-4" style={{backgroundColor: '#0682A0'}}>
        <div className="container">
          <Link className="navbar-brand" to="/" style={{color:'white'}}>
            GymMania
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            
          >
            <span className="navbar-toggler-icon" style={{color:'white'}} />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register" style={{color:'white'}}>
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" style={{color:'white'}}>
            Login
          </Link>
        </li>
      </ul>
          </div>
        </div>
      </nav>
      
    
    );
    
    return (
      <div>
         {isAuthenticated ? authLinks : guestLinks}
      </div>
       
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
