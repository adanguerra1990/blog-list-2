import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const initialState = {
  comments: [],
  content: '',
}

const formSlice = createSlice({
  name: 'formComment',
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload
    },
    addComment(state, action) {
      state.comments.push(action.payload)
    },
    setField(state, action) {
      const { field, value } = action.payload
      state[field] = value
    },
    resetForm(state) {
      state.content = ''
    },
  },
})

export const { setComments, addComment, setField, resetForm } =
  formSlice.actions

export const fetchComments = blogId => {
  return async dispatch => {
    const comments = await blogServices.getComments(blogId)
    dispatch(setComments(comments))
  }
}
export const createComment = (blogId, comment) => {
  return async dispatch => {
    const newComment = await blogServices.createComments(blogId, comment)
    dispatch(addComment(newComment))
  }
}

export default formSlice.reducer
