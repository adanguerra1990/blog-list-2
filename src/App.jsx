import { useEffect, useState } from 'react'
import './App.css'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })
      console.log(user)
      setUser(user)
      setPassword('')
      setUsername('')
      alert(`logged in user: ${user.name}`)
    } catch (error) {
      alert('login failed:', error)
    }
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }
  const handlePassworddChange = event => {
    setPassword(event.target.value)
  }

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
      {user ? (
        <div>
          <h3>Logged in as {user.name}</h3>
          <BlogForm createBlog={addBlog} />
          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChnage={handlePassworddChange}
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
