import { useDispatch, useSelector } from 'react-redux'
import { loginUser, updateLoginForm } from '../redux/authReducer'
import { showNotification } from '../redux/notificationReducer'

const LoginForm = () => {
  const { username, password } = useSelector(state => state.auth.loginForm)
  const dispatch = useDispatch()

  const handleChange = event => {
    const { name, value } = event.target
    dispatch(updateLoginForm({ field: name, value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password }))
      dispatch(showNotification(`Welcome ${username}`, 'success', 5))
    } catch (error) {
      dispatch(showNotification('Invalid username or password', 'error', 5))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            name='username'
            autoComplete='current-username'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            name='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
