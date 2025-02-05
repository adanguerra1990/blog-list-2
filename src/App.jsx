import { useEffect } from 'react'
import './App.css'
import blogServices from './services/blogs'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './redux/blogReducer'
import { setUser } from './redux/authReducer'
import { Route, Routes } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import User from './components/User'
import NavBar from './components/NavBar'

function App() {
  const user = useSelector(state => state.auth.user)
  const notification = useSelector(state => state.notification)
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

  return (
    <div>
      <NavBar />
      <Notification message={notification.message} type={notification.type} />
      {user ? (
        <div>
          <Routes>
            <Route
              path='/'
              element={
                <section className='container mx-auto'>
                  <Blogs />
                </section>
              }
            />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<BlogDetails />} />
          </Routes>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
