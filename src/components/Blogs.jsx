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
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  console.log('blog...', blogs)

  return (
    <div>
      <h2 className='text-2xl text-center font-bold mb-4'>Blogs</h2>
      <TableContainer component={Paper} className='shadow-md'>
        <Table>
          <TableHead>
            <TableRow className='bg-gray-100'>
              <TableCell className='font-bold'>Title</TableCell>
              <TableCell className='font-bold'>Create by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id} className='hover:bg-gray-50'>
                <TableCell>
                  <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.user ? blog.user.name : 'Unknown'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs
