import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    return null
  }

  return (
    <section className='container mx-auto'>
      <h2 className='text-2xl text-center font-bold my-4'>{user.name}</h2>
      <TableContainer component={Paper} className='shadow-md'>
        <Table>
          <TableHead>
            <TableRow className='bg-gray-100'>
              <TableCell>Added Blogs</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}

export default User
