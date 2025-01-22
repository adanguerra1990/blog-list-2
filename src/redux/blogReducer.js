import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    const blog = await blogServices.create(newBlog)
    dispatch(addBlog(blog))
  }
}

export default blogSlice.reducer
