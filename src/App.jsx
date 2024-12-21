import { useEffect, useState } from 'react'
import './App.css'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

function App() {
  const [blogs, setBlogs] = useState([])

  console.log(blogs)

  useEffect(() => {
    blogServices.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  const addBlog = blogObject => {
    blogServices.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  return (
    <div>
      <BlogForm createBlog={addBlog} />
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
