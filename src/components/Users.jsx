import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialUsers } from '../redux/usersReducer'
import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initialUsers())
  }, [dispatch])

  return (
    <section className='container mx-auto'>
      <h2 className='text-2xl text-center font-bold my-4'>Users</h2>
      <TableContainer component={Paper} className='shadow-md'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} className='hover:bg-gray-50'>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}

export default Users
