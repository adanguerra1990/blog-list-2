import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  resetForm,
  setField,
} from '../redux/formCommentsReducer'

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
    <form onSubmit={handleCommentSubmit}>
      <input type='text' value={content} onChange={handleCommentChange} />
      <button type='submit'>Add Comment</button>
    </form>
  )
}

export default CommentForm
