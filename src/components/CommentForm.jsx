import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  resetForm,
  setField,
} from '../redux/formCommentsReducer'
import { Button, TextField } from '@mui/material'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const content = useSelector(state => state.formComment.content)

  const handleCommentChange = event => {
    dispatch(setField({ field: 'content', value: event.target.value }))
  }

  const handleCommentSubmit = event => {
    event.preventDefault()
    dispatch(createComment(blogId, { content }))
    dispatch(resetForm())
  }

  return (
    <form onSubmit={handleCommentSubmit} className='flex gap-2'>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Write a comment...'
        type='text'
        value={content}
        onChange={handleCommentChange}
      />
      <Button type='submit' variant='contained'>
        Add Comment
      </Button>
    </form>
  )
}

export default CommentForm
