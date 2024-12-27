import { useEffect, useState } from 'react'
import './App.css'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    blogServices.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })
      console.log(user.token)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))

      setUser(user)
      setPassword('')
      setUsername('')
      blogServices.setToken(user.token)
      setNotificationType('success')
      setNotification(`logged in user: ${user.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification('Invalid username or password', error)
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setNotificationType('success')
    setNotification('logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    window.localStorage.removeItem('loggedBlogListUser')
  }

  const addBlog = async blogObject => {
    try {
      const returnedBlog = await blogServices.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationType('success')
      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setNotificationType('error')
      setNotification('failed to add blog:', error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      {user ? (
        <div>
          <h3>Logged in as {user.name}</h3>
          <button onClick={handleLogout}>Logout</button>
          <BlogForm createBlog={addBlog} />
          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={event => setUsername(event.target.value)}
          handlePasswordChnage={event => setPassword(event.target.value)}
          username={username}
          password={password}
        />
      )}
    </div>
  )
}

export default App
