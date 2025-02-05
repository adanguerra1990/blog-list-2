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
    <div className='h-screen flex justify-center items-center vh-f'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-gray-700'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Username</label>
            <input
              type='text'
              value={username}
              name='username'
              autoComplete='current-username'
              onChange={handleChange}
              disabled={loading}
              className='w-full p-2 border border-gray-300 rounded text-gray-800'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2'>Password</label>
            <input
              type='password'
              value={password}
              name='password'
              autoComplete='current-password'
              onChange={handleChange}
              disabled={loading}
              className='w-full p-2 border border-gray-300 rounded text-gray-800'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4 '
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
