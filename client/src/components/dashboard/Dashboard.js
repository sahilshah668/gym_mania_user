import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGymProfiles,getGymProfileDetail } from '../../actions/gymAction';
import { GridLoader } from 'react-spinners';
class Dashboard extends Component {
  componentDidMount() {
    this.props.getGymProfiles();
  }
  
  onClick(e) {
    e.preventDefault();
    this.props.getGymProfileDetail()
  }

  render() {
    const { user } = this.props.auth;
    const { gyms, loading } = this.props.gym;

    let dashboardContent;

    if(gyms === null || loading) {
      dashboardContent =  <GridLoader
      sizeUnit={"px"}
      size={10}
      color={'black'}
    />
    }else {
      
        dashboardContent = Object.values(gyms).map(value => {
          //use value here
          return (
            <div>
          <div className="card" style={{backgroundColor:' #e6ffff'}} >
    <div className="card-body">
      <h5 className="card-title">Gym: {" "} {value.gymname}</h5>
      <h6 className="card-subtitle mb-2 text-muted">City: {" "} {value.city}</h6>
      <p className="card-text">Contact: {" "} {value.contact}</p>
      <p  className="card-text">Location: {" "} {value.location}</p>
      <button onClick={this.onClick.bind(this)} className="btn btn-success"></button>
    </div>
  </div>
    <br/>
    </div>
          )
      });
      
    }
      
    return (
      <div className="dashboard" >
        <div className="conatiner">
          <div className="row">
             
              <div className="col-md-12">
              <h4 className="display-8" style={{padding:'5px'}}>
                ALL GYMS
              </h4>
              </div>
              
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            {dashboardContent}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGymProfileDetail:PropTypes.func.isRequired,
  getGymProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  gym:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  gym: state.gym,
  auth: state.auth
});

export default connect(mapStateToProps, {getGymProfileDetail, getGymProfiles})(
  Dashboard
);
