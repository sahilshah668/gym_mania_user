import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {LogoutUser} from '../../actions/authAction'
import {clearCurrentProfile } from '../../actions/profileAction'

 class Navbar extends Component {
   onLogoutClick(e) {
     e.preventDefault();

     this.props.LogoutUser();
     this.props.clearCurrentProfile()
   }
  render() {
    const {isAuthenticated,user} = this.props.auth
    const authLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            Profiles
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/edit-profile">
            EDIT-PROFILE
          </Link>
        </li>
          <li className="nav-item dropdown">
          
          <img className="rounded-circle" src={user.avatar} alt={user.name}  style={{ width: '28px' ,marginRight:'5px',paddingTop: '2px' }} />
         </li>  
         <li className="nav-item ">
          <button className="btn btn-danger btn-rounded btn-danger btn-sm" style={{}} onClick={this.onLogoutClick.bind(this)} >
          <i className="fas fa-sign-out-alt"></i>
          </button>
         </li>
                    
        </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
    )
    return (
      <div>
         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">GymMania</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="profiles.html"> Gym
            </a>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
        
      </div>
    </div>
  </nav>
      </div>
    )
  }
}

 LogoutUser.propTypes ={
  LogoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth
})


export default connect(mapStateToProps,{LogoutUser, clearCurrentProfile})(Navbar)