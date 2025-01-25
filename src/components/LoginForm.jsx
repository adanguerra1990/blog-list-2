import { useDispatch, useSelector } from 'react-redux'
import { loginUser, updateLoginForm } from '../redux/authReducer'
import { showNotification } from '../redux/notificationReducer'

const LoginForm = () => {
  const { username, password } = useSelector(state => state.auth.loginForm)
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleChange = event => {
    const { name, value } = event.target
    dispatch(updateLoginForm({ field: name, value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const user = await dispatch(loginUser({ username, password }))
      dispatch(showNotification(`Welcome ${user.name}`, 'success', 5))
    } catch (error) {
      dispatch(showNotification(error.message, 'error', 5))
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button type='submit'>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default LoginForm
