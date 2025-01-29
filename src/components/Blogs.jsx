import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../redux/blogReducer'
import { showNotification } from '../redux/notificationReducer'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
