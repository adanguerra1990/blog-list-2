import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

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
