import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,onClickLikes,onClickRemove }) => {
  const[visible,setVisible]=useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async (e) => {
    e.preventDefault()
    const newBlog={ ...blog,likes:blog.likes+1 }
    try{
      const result = await blogService.put(newBlog)
      onClickLikes(result)
    }catch(error){
      console.error('failed to update likes', error.message)
    }
  }

  const handleRemove = async (blog) => {
    if(window.confirm(`Do you really want to delete ${blog.title}`)){
      try{
        await blogService.remove(blog.id)
        onClickRemove(blog,true)
      }catch(error){
        console.error('failed to remove blog', error.message)
        onClickRemove(blog,false)
      }
    }

  }

  if(!visible){
    return (
      <div style={blogStyle}>
        <div>
          <p>TITLE:{blog.title} AUTHOR:{blog.author}<button onClick={() => setVisible(prev => !prev)}>view</button></p>
        </div>
      </div>
    )
  }
  if(visible){
    return (
      <div style={blogStyle}>
        <div>
          <p>TITLE:{blog.title} AUTHOR:{blog.author} <button onClick={() => setVisible(!visible)}>hide</button></p>
          <p>URL:{blog.url}</p>
          <p>Likes:{blog.likes} <button onClick={handleLikes}>like</button></p>
          <p>USER:{blog.user.username}</p>
          {blog.user.username===JSON.parse(window.localStorage.getItem('loggedUser')).username&&<button onClick={() => handleRemove(blog)}>remove</button>}
        </div>
      </div>
    )
  }


}

export default Blog