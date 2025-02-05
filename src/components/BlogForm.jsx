import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../redux/notificationReducer'
import { createBlog } from '../redux/blogReducer'
import { resetForm, setField } from '../redux/formReducer'

const BlogForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const { title, author, url } = useSelector(state => state.form)
  const user = useSelector(state => state.auth.user)

  const handleSubmit = async event => {
    event.preventDefault()

    if (!title.trim() || !author.trim() || !url.trim()) {
      dispatch(showNotification('All fields are required', 'error', 5))
      return
    }

    try {
      const blogObject = { title, author, url, user: user.id }
      dispatch(createBlog(blogObject))

      dispatch(
        showNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          'succes',
          5
        )
      )
      onClose()
    } catch (error) {
      dispatch(showNotification('failed to add blog:', 'error', 5))
    }
    dispatch(resetForm())
  }

  const handleChange = event => {
    const { name, value } = event.target
    dispatch(setField({ field: name, value }))
  }

  const handleCancel = () => {
    dispatch(resetForm())
    onClose()
  }

  return (
    <div>
      <h2 className='text-xl font-bold mb-4 text-gray-700'>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 '>Title</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            className='text-gray-900  w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block text-gray-700 '>Author</label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleChange}
            className='text-gray-900  w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block text-gray-700 '>Url</label>
          <input
            type='text'
            name='url'
            value={url}
            onChange={handleChange}
            className='text-gray-900  w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 mr-4'
        >
          Create
        </button>
        <button
          type='submit'
          className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 mt-4'
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default BlogForm
