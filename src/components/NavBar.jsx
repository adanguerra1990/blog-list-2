import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/authReducer'
import { showNotification } from '../redux/notificationReducer'

const NavBar = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(showNotification('logged out', 'success', 5))
  }

  if (!user) {
    return null
  }

  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default NavBar
