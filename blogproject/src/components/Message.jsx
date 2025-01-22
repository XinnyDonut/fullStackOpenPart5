const Message = (prop) => {
  return <p>{prop.name} is logged in<button onClick={prop.handleClick}>logout</button></p>
}


export default Message