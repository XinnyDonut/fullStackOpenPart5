import PropTypes from 'prop-types'
import { useState } from 'react'

const Togglable =(props) => {
  const[visible,setVisible]=useState(false)

  const hide={
    display:visible?'none':''
  }
  const show={
    display:visible?'':'none'
  }

  const toggleVisiblity =() => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisiblity}>{props.label}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  label:PropTypes.string.isRequired
}
export default Togglable