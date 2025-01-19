import { useEffect, useState } from 'react'
import './App.css'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    if (user) {
      blogServices.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [user])

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

  const handleLike = async id => {
    const blogToLike = blogs.find(blog => blog.id === id)
    const updateBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }

    try {
      const returnedBlog = await blogServices.update(id, updateBlog)
      setBlogs(
        blogs.map(blog =>
          blog.id !== id ? blog : { ...returnedBlog, user: blogToLike.user }
        )
      )
      setNotification('success')
      setNotification(`you liked '${returnedBlog.title}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setNotification('error')
      setNotification('failed to like blog:', error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async id => {
    const blogToDelete = blogs.find(b => b.id === id)

    if (window.confirm(`Delete ${blogToDelete.title}`)) {
      try {
        await blogServices.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotificationType('success')
        setNotification('Blog deleted successfully')
      } catch (error) {
        setNotificationType('error')
        setNotification('Failed to delete blog')
      } finally {
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      {user ? (
        <div>
          <h3>Logged in as {user.name}</h3>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel='Create New Blog'>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
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
