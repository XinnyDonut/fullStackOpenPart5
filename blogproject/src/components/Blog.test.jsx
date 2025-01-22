import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

afterEach(() => {
  window.localStorage.clear()
})

test('renders only title and author', () => {
  const blog = {
    title: 'I will be rendered',
    author: 'render',
    url:'www.163.com',
    likes: 5,
    user: 'testUser'
  }

  render(<Blog blog={ blog }/>)

  const titleAndAuthor = screen.getByText(`TITLE:${blog.title} AUTHOR:${blog.author}`)


  const url=screen.queryByText(`url:${blog.url}`)
  expect(url).toBeNull()

  const likes=screen.queryByText(`Likes:${blog.likes}`)
  expect(likes).toBeNull()

  const user=screen.queryByText(`USER:${blog.user}`)
  expect(user).toBeNull()

})



test('show hidden content when click view button', async () => {
  const blog = {
    title: 'I will be rendered',
    author: 'render',
    url: 'www.163.com',
    likes: 5,
    user: {
      username: 'testUser'
    }
  }
  const mockUser = {
    username: 'testUser'
  }
  window.localStorage.setItem('loggedUser', JSON.stringify(mockUser))

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewBtn = screen.getByText('view')
  await user.click(viewBtn)

  const url = screen.getByText(`URL:${blog.url}`)
  const likes = screen.getByText(`Likes:${blog.likes}`)
})




vi.mock('../services/blogs', () => ({
  default: {
    put: vi.fn().mockResolvedValue({
      title: 'I will be rendered',
      author: 'render',
      url: 'www.163.com',
      likes: 6,  // increment likes by 1
      user: {
        username: 'testUser'
      }
    })
  }
}))

test('click button calls the event handler', async () => {
  const blog = {
    title: 'I will be rendered',
    author: 'render',
    url: 'www.163.com',
    likes: 5,
    user: {
      username: 'testUser'
    }
  }

  const mockUser = {
    username: 'testUser'
  }
  window.localStorage.setItem('loggedUser', JSON.stringify(mockUser))

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} onClickLikes={mockHandler}/>
  )
  
  const user = userEvent.setup()
  const viewBtn = screen.getByText('view')
  await user.click(viewBtn)
  
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})