import { useState } from 'react'

const Login=({ onLogin }) => {
  const[formData,setFormData]=useState({ username:'',password:'' })

  const handleChange=(e) => {
    const{ name,value }=e.target
    setFormData(prev => ({ ...prev,[name]:value }))
  }

  const handleSubmit= (e) => {
    e.preventDefault()
    onLogin(formData)
    setFormData({
      username:'',
      password:''
    })
  }
  return(
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id='username'
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
          /></div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id='password'
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          /></div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login