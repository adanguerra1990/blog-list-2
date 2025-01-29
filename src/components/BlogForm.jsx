import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../redux/notificationReducer'
import { createBlog } from '../redux/blogReducer'
import { resetForm, setField } from '../redux/formReducer'

const BlogForm = () => {
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
    } catch (error) {
      dispatch(showNotification('failed to add blog:', 'error', 5))
    }
    dispatch(resetForm())
  }

  const handleChange = event => {
    const { name, value } = event.target
    dispatch(setField({ field: name, value }))
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type='text'
            name='author'
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Url</label>
          <input type='text' name='url' value={url} onChange={handleChange} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
