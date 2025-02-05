import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/authReducer'
import { showNotification } from '../redux/notificationReducer'
import { useState } from 'react'
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Overlay from './Overlay'
import BlogForm from './BlogForm'

const NavBar = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(showNotification('logged out', 'success', 5))
  }

  const handleManuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  if (!user) {
    return null
  }

  return (
    <nav className='bg-blue-500 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white font-bold text-xl'>
          <Link to='/'>Bloglist</Link>
        </div>
        <div className='hidden md:flex items-center space-x-4'>
          <Link to='/' className='text-white hover:text-gray-200'>
            Home
          </Link>
          <Link to='/users' className='text-white hover:text-gray-200'>
            Users
          </Link>
          <span className='text-white'>{user.name} </span>
          <Button
            variant='contained'
            color='error'
            onClick={handleLogout}
            className='text-white hover:text-gray-200 bg-gray-700 p-3 rounded-md ml-4'
          >
            Logout
          </Button>
          <div className='ml-4'>
            <Overlay buttonLabel='Create Blog'>
              {handleClose => <BlogForm onClose={handleClose} />}
            </Overlay>
          </div>
        </div>
        <div className='md:hidden'>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={handleManuOpen}
            sx={{ '&:focus': { outline: 'none' } }}
          >
            <MenuIcon className='text-white ' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to='/' className='text-gray-700'>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to='/users' className='text-gray-700'>
                Users
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <span className='text-gray-700'>{user.name}</span>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <button
                onClick={handleLogout}
                className='text-gray-700 hover:text-gray-200'
              >
                Logout
              </button>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
