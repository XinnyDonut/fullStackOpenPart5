import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Notif from './components/Notif'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const[user,setUser]=useState(null)
  const[notif,setNotif]=useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs= blogs.toSorted((a,b) => a.likes-b.likes)
      setBlogs( sortedBlogs )
    }
    )
  }, [])

  useEffect(() => {
    if(window.localStorage.getItem('loggedUser')!==null){
      const user=JSON.parse(window.localStorage.getItem('loggedUser'))
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleLogin = async (loginData) => {
    try{
      const user = await loginService.login(loginData)
      if(user){
        const token=user.token
        blogService.setToken(token)
        setUser(user)
        setNotif(`${user.username} logged in successfully`)
        window.localStorage.setItem('loggedUser',JSON.stringify(user))
      }
    }catch(error){
      console.log('invalid',error)
      setNotif(`Logged in failed.${error}`)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog= async (blogData) => {
    const response=await blogService.add(blogData)
    setBlogs(blogs.concat(response))
    setNotif(`a new blog ${blogData.title} by ${blogData.author} added`)
  }

  const likesHandler=(returnedData) => {
    console.log('Returned data from like:', returnedData)
    console.log('before sorting',blogs)
    setBlogs(blogs.map((blog) => blog.id===returnedData.id?returnedData:blog).sort((a,b) => a.likes-b.likes))
  }

  const removeHandler =  (deletedBlog,success) => {
    console.log('removeHandler called with success:', success)
    if(success){
      setBlogs(blogs.filter(b => b.id!==deletedBlog.id))
      setNotif('blog deleted successfully')
    }else{
      setNotif('Failed to delete post')
    }
  }


  return (
    <div>
      {user === null? (
        <Login onLogin={handleLogin}
        />
      ) : (
        <>
          <Notif message={notif}/>
          <Message name={user.username} handleClick={handleLogout}/>
          <Togglable label="new Blog">
            <BlogForm onSubmit={createBlog}/>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id}
              blog={blog}
              onClickLikes={(returnedData) => likesHandler(returnedData)}
              onClickRemove={(blog,success) => removeHandler(blog,success)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App