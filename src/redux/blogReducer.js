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
    updateBlog(state, action) {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions

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

export const likeBlog = id => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find(blog => blog.id === id)
    const updateToBlog = await blogServices.update(id, {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user,
    })
    dispatch(updateBlog(updateToBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogServices.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
