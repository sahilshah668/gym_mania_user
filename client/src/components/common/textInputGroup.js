import React from 'react'
import PropTypes from 'prop-types'
const textInputGroup = (
    type,
    placeholder,
    value,
    onChange,
    name,
    error,
    disabled
) => {
  return (
            <div className="form-group">
              <input 
              type={type} className="form-control form-control-lg"
               placeholder={placeholder} 
               value={value} 
               name={name} 
               onChange={onChange}
               disabled={disabled} 
               required/>
            </div>
  )
}
textInputGroup.propTypes = {
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    disbaled:PropTypes.string
}
export default textInputGroup
