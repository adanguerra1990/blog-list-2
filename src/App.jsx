import { useEffect } from 'react'
import './App.css'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './redux/notificationReducer'
import { initialBlogs } from './redux/blogReducer'
import { logoutUser, setUser } from './redux/authReducer'
import { Link, Route, Routes } from 'react-router-dom'
import User from './components/User'

function App() {
  const user = useSelector(state => state.auth.user)
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initialBlogs())
    }
  }, [user, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogServices.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(showNotification('logged out', 'success', 5))
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/users'}>Users</Link>
      </nav>
      {user ? (
        <div>
          <h3>Logged in as {user.name}</h3>
          <button onClick={handleLogout}>Logout</button>
          <Routes>
            <Route
              path='/'
              element={
                <div>
                  <Togglable buttonLabel='Create New Blog'>
                    <BlogForm />
                  </Togglable>
                  <h2>Blogs</h2>
                  {blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </div>
              }
            />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
