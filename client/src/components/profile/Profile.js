import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions'
import {Link} from 'react-router-dom'
import {GridLoader} from 'react-spinners' 
class Profile extends Component {
   componentDidMount() {
     this.props.getCurrentProfile()
   }
  render() {
    const { user } = this.props.auth
    const {profile,loading} = this.props.profile

     let profileContent

     if(profile === null || loading) {
       profileContent = (
        <GridLoader
        sizeUnit={"px"}
        size={10}
        color={'black'}
        style={{margin:'auto',display:'block'}}
      />
       )
     }else {
       if(Object.keys(profile).length > 0) {
         profileContent = (
           <div>
              <p className="lead text-muted">
              Welcome {user.name}
              </p>
              <p className="lead text-muted">
              Bio: {profile.bio}
              </p>

              <Link to="/edit-prrofile" className="btn btn-warning btn-md">Edit Profile</Link>
           </div>
         )
       }else {
          profileContent = (
            <div>
              <p className="lead text-muted">
              Welcome {user.name}
              </p>
              <p>You have not yet created Your Profile ,please add some info </p>
              <Link to='/create-profile' className="btn btn-primary btn-lg">Create Profile</Link>
            </div>
          )
       }
     }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <h4 className="display-7">Hello {' '} {user.name}</h4>
                <br />
                <br />
                {profileContent}
                
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes= {
  getCurrentProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  auth : state.auth, 
  profile :   state.profile
})

export default connect(mapStatetoProps,{getCurrentProfile})(Profile)