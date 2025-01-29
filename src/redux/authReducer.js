import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/login'
import blogServices from '../services/blogs'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    loginForm: {
      username: '',
      password: '',
    },
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    updateLoginForm(state, action) {
      const { field, value } = action.payload
      state.loginForm[field] = value
    },
    resetLoginForm(state) {
      state.loginForm = { username: '', password: '' }
    },
  },
})

export const {
  setUser,
  clearUser,
  updateLoginForm,
  resetLoginForm,
  setLoading,
} = authSlice.actions

export const loginUser = credentials => {
  return async dispatch => {
    try {
      dispatch(setLoading(true))
      const user = await loginServices.login(credentials)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      dispatch(setUser(user))
      dispatch(resetLoginForm())
      dispatch(setLoading(false))
      return user
    } catch (error) {
      dispatch(setLoading(false))
      throw new Error('Invalid username or password')
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogListUser')
    blogServices.setToken(null)
    dispatch(clearUser())
  }
}

export default authSlice.reducer
