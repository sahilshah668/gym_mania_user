import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {LoginUser} from '../../actions/authAction' 

 class Login extends Component {
     constructor() {
         super();
         this.state = {
             email:'',
             password:'',
             errors:{}
         }
         this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     }
     componentDidMount() {
       if(this.props.auth.isAuthenticated) {
         this.props.history.push('/dashboard')
       }
     }
     componentWillReceiveProps(nextProps) {
       if(nextProps.auth.isAuthenticated) {
         this.props.history.push('/dashboard')
       }
      //  if(nextProps.errors) {
      //    this.setState({errors:nextProps.errors})
      //  }
     }
     onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            
            email:this.state.email,
            password:this.state.password,
            }
        this.props.LoginUser(userData)
    }
  render() {
      // const {errors} = this.state
    return (
        <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your DevConnector account</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} required/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
Login.propTypes = {
  LoginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  // err:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth:state.auth,
  err:state.err
})
export default connect(mapStateToProps,{ LoginUser })(Login)