import {render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls onSumbit with the right formData', async () => {
  const onSubmit=vi.fn()
  const user=userEvent.setup()

  render(<BlogForm onSubmit={onSubmit}/>)
  
  const titleInput=screen.getByTestId('title')
  const authorInput=screen.getByTestId('author')
  const urlInput=screen.getByTestId('url')
  const submitBtn=screen.getByText('Submit')
  
  await user.type(titleInput,'testing a form')
  await user.type(authorInput,'testAuthor')
  await user.type(urlInput,'www.test.com')
  await user.click(submitBtn)

  expect(onSubmit.mock.calls).toHaveLength(1)
  expect(onSubmit.mock.calls[0][0].title).toBe('testing a form')
  expect(onSubmit.mock.calls[0][0].author).toBe('testAuthor')
  expect(onSubmit.mock.calls[0][0].url).toBe('www.test.com')
//onSubmit.mock.calls is an array that contains all the calls made to your mock function
//[0] gets the first call made to the function (since arrays are 0-indexed)
//The second [0] gets the first argument of that call

})