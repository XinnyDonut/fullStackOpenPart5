import { useEffect,useState } from "react";

const Notif = ({message}) => {
  const notifStyle={
    color:'red',
    backgroundColor:'lightgrey', 
    padding:'10',
    marginBottom:'10'
  }
  
  const[visible,setVisible]=useState(true);
  useEffect(() => {
    if(message){
      setVisible(true)
      const timer=setTimeout(() =>{
        setVisible(false)
      },5000)
    }
    return ()=>clearTimeout(timer)
  },[message])
  
  if(!visible||!message){
    return null
  }  
  return <div style={notifStyle}>{message}</div>
}
export default Notif