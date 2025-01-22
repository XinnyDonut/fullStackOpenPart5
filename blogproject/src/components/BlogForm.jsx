import { useState } from 'react'

const BlogForm= ({ onSubmit }) => {
  const [formData,setFormData]=useState({
    title:'',
    author:'',
    url:''
  })

  const handleChange=(e) => {
    const { name,value }=e.target
    setFormData(prev => ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ title:'',author:'',url:'' })
  }

  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type='text'
          value={formData.blogTitle}
          name="title"
          onChange={handleChange}
          data-testid='title'
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          id='author'
          type='text'
          value={formData.author}
          name='author'
          onChange={handleChange}
          data-testid='author'
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input
          id='url'
          type='text'
          value={formData.url}
          name='url'
          onChange={handleChange}
          data-testid='url'
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </>
}

export default BlogForm