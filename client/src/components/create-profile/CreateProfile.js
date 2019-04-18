import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile } from '../../actions/profileAction';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio:'',
      userName:'',
      email:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      bio:this.state.bio,
      userName:this.state.userName,
      email:this.state.email
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* UserName"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  info="A unique userName for your profile"
                />
                <TextFieldGroup
                     placeholder="* email"
                     name="email"
                     value={this.props.auth.email}
                     onChange={this.onChange}
                     info="your email comes from registered email"
                />
                <TextAreaFieldGroup
                     placeholder="* bio"
                     name="bio"
                     value={this.state.bio}
                     onChange={this.onChange}
                     info="Please Give your bio to known by other user"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth:PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth:state.auth
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
