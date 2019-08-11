import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addPost } from '../../actions/postAction'
 class PostForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            caption: '',
            text:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    } 

    onSubmit(e) {
      e.preventDefault()
      const {user} = this.props.auth
      const newPost = {
        caption: this.state.caption,
        text:this.state.text,
        name:user.name,
        avatar:user.avatar
      }
      this.props.addPost(newPost)
      this.setState({text: '' , caption: ''})
    }
    onChange(e) {
      this.setState({[e.target.name]:e.target.value})
    }
  render() {
    return (
      <div className="form">
          <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                    placeholder='Create Post'
                    name="caption"
                    value={this.state.caption}
                    onChange={this.onChange}
                    />
                    <TextAreaFieldGroup
                    placeholder='Create Post'
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth:state.auth
})
export default connect(mapStateToProps, {addPost})(PostForm)