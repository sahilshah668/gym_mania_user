import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
// import google from '../../img/google.jpg'
// import logo from '../../img/images (5).jpg'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {isAuthenticated} = this.props.auth
    if (isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    console.log('didmount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('recieve props')
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (                               
          <div className="landing">
        <div className=" landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-4 text-center" style={{left:'5%'}}>
                  <div className="card" style={{backgroundColor:'#04848D'}}>
                    <div className="card-header">
                      {/* <img src={logo}></img> */}
                      <h3>FITHUB</h3>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                <TextFieldGroup        
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  style={{borderRadius:'7.3rem !important'}}  
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <div className="row">
                  <div className="col-md-5">
                  <small onSubmit={this.forget} style={{color:'blue'}}>Forget Password</small>
                  </div>
                  <div className="col-md-7"></div>
                </div>
               
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

                    </div>
                    <div className="card-footer">
                    <h4 className="text-center" >OR </h4>
                            <small className="text-center" >Login With</small>
                     <div className="row">
                            
                     <div className="col-md-2"></div>
                     {/* <div className="col-md-4">
                     <img src={google} height="50px" style={{width:49, borderRadius:35}}></img>
                     </div>
                     <div className="col-md-4">
                     <img src={google} height="50px" style={{width:49, borderRadius:35}}></img>
                     </div> */}
                     </div>
                     
                    </div>
                  </div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
