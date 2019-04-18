import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileAction';

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
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // // Bring skills array back to CSV
      // const skillsCSV = profile.skills.join(',');

      // // If profile field doesnt exist, make empty string
      // profile.company = !isEmpty(profile.company) ? profile.company : '';
      // profile.website = !isEmpty(profile.website) ? profile.website : '';
      // profile.location = !isEmpty(profile.location) ? profile.location : '';
      // profile.githubusername = !isEmpty(profile.githubusername)
      //   ? profile.githubusername
      //   : '';
      // profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      // profile.social = !isEmpty(profile.social) ? profile.social : {};
      // profile.twitter = !isEmpty(profile.social.twitter)
      //   ? profile.social.twitter
      //   : '';
      // profile.facebook = !isEmpty(profile.social.facebook)
      //   ? profile.social.facebook
      //   : '';
      // profile.linkedin = !isEmpty(profile.social.linkedin)
      //   ? profile.social.linkedin
      //   : '';
      // profile.youtube = !isEmpty(profile.social.youtube)
      //   ? profile.social.youtube
      //   : '';
      // profile.instagram = !isEmpty(profile.social.instagram)
      //   ? profile.social.instagram
      //   : '';

      // Set component fields state
      this.setState({
         bio:profile.bio,
      userName:profile.userName,
      email:profile.email,
      errors: {}
      });
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
    const { errors,  } = this.state;

    
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* userName"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  info="A unique userName for your profile URL."
                />
                <TextAreaFieldGroup
                  placeholder="* bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  info="A unique BIO for your profile URL."
                />
                <TextFieldGroup
                  placeholder="* email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  info="email."
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
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
