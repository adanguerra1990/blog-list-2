import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../redux/blogReducer'
import { showNotification } from '../redux/notificationReducer'
import { useEffect } from 'react'
import { fetchComments } from '../redux/formCommentsReducer'
import CommentForm from './CommentForm'
import { Button, Card, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const BlogDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const comments = useSelector(state => state.formComment.comments)

  useEffect(() => {
    if (blog) {
      dispatch(fetchComments(blog.id))
    }
  }, [blog, dispatch])

  if (!blog) return <p>Blog no found</p>

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog.id))
      dispatch(showNotification(`you liked '${blog.title}'`, 'success', 5))
    } catch (error) {
      dispatch(showNotification('failed to like blog:', 'error', 5))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete ${blog.title}`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(showNotification('Blog deleted successfully', 'success', 5))
      } catch (error) {
        dispatch(showNotification('Failed to delete blog', 'error', 5))
      }
    }
  }

  const canDelete = user && blog.user && blog.user.username === user.username

  return (
    <Card className='mt-4 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <Typography variant='h4' className='text-gray-900 font-bold'>
        {blog.title}
      </Typography>
      <Typography variant='h6' className='text-gray-900 font-bold'>
        Author: {blog.author}
      </Typography>
      <Typography variant='body1' className='text-gray-600'>
        Url: {blog.url}
      </Typography>

      <div className='flex items-center gap-4 my-4'>
        <Button variant='contained' color='primary' onClick={handleLike}>
          <ThumbUpIcon />
        </Button>
        <Typography variant='body1'>{blog.likes}</Typography>
      </div>
      <Typography variant='body1' className='text-gray-600'>
        Create by: {blog.user.name}
      </Typography>
      {canDelete && (
        <Button
          variant='contained'
          color='error'
          className='my-10'
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      <div className='my-4'></div>
      <Typography variant='h5' className='mt-6 text-gray-900 font-semibold'>
        Comments
      </Typography>
      <CommentForm blogId={blog.id} />
      <ul className='mt-4 space-y-2'>
        {comments.map((comment, index) => (
          <li
            key={comment.id}
            className={`p-3 rounded-lg ${
              index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            {comment.content}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default BlogDetails
