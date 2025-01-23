import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../redux/blogReducer'
import { showNotification } from '../redux/notificationReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog.id))
      dispatch(showNotification(`you liked '${blog.title}'`, 'success', 5))
    } catch (error) {
      dispatch(showNotification('failed to like blog:', 'error', 5))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete ${blog.title}`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(showNotification('Blog deleted successfully', 'success', 5))
      } catch (error) {
        dispatch(showNotification('Failed to delete blog', 'error', 5))
      }
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const canDelete = user && blog.user && blog.user.username === user.username

  return (
    <div>
      <div>
        <p>Title: {blog.title}</p>
      </div>
      {visible && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <button onClick={handleLike}>Like</button>
          <span>{blog.likes}</span>
          {canDelete && <button onClick={handleDelete}>Delete</button>}
          <p>Create by: {blog.user.name}</p>
        </div>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
    </div>
  )
}

export default Blog
