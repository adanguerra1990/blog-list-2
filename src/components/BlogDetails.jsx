import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../redux/blogReducer'
import { showNotification } from '../redux/notificationReducer'

const BlogDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if (!blog) return <p>Blog no found</p>

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

  const canDelete = user && blog.user && blog.user.username === user.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <h3>Author: {blog.author}</h3>
      <p>Url: {blog.url}</p>
      <button onClick={handleLike}>Like</button>
      <span>{blog.likes}</span>
      <p>Create by: {blog.user.name}</p>
      {canDelete && <button onClick={handleDelete}>Delete</button>}
    </div>
  )
}

export default BlogDetails
