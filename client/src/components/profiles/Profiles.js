import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProfiles} from '../../actions/profileActions'
import  {ProfileItem} from  './ProfileItem'
import {GridLoader} from 'react-spinners'
 class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles()
    }
    render() {
     const {profiles, loading} = this.props.Profile
     const {user } = this.props.auth
     let content 

     if(profiles === null || loading) {
        content = (
            <GridLoader
        sizeUnit={"px"}
        size={10}
        color={'black'}
        style={{margin:'auto',display:'block'}} />
        )
     } else {
         if(profiles.length > 0){
            content = Object.values(profiles).map(type => {
                return (
                    <div className="card card-body  mb-3" style={{backgroundColor:'#e6ffff'}}>
                    <div className="row">
                      <div className="col-2">
                        <img src={user.avatar} alt="" className="rounded-circle" />
                      </div>
                      <div className="col-lg-6 col-md-4 col-8">
                        <h3>{type.userName}</h3>
                        <p className="lead">{type.bio}</p>
                    </div>
                    </div>
                  </div>
                  
                )   
                
            })
         }else {
             content = (<h4 className="display-5 text-cente">No Profile found....</h4>)
             
         }
         
     }
    return (
      <div className="profiles">
        <div className="container">
        <div className="row">
        <div className="col-md-2"></div>
         <div className="col-md-8">
         <h1 className="display-4 text-center">Profiles</h1>
         <br/>
         {content}
         </div>
        </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    Profile:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth:state.auth,
    Profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)