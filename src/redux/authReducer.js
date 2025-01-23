import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/login'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
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
    updateLoginForm(state, action) {
      const { field, value } = action.payload
      state.loginForm[field] = value
    },
    resetLoginForm(state) {
      state.loginForm = { username: '', password: '' }
    },
  },
})

export const { setUser, clearUser, updateLoginForm, resetLoginForm } =
  authSlice.actions

export const loginUser = credentials => {
  return async dispathc => {
    try {
      const user = await loginServices.login(credentials)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      dispathc(setUser(user))
      dispathc(resetLoginForm())
    } catch (error) {
      console.log('Invalid username or password', error)
    }
  }
}

export const logoutUser = () => {
  return dispathc => {
    window.localStorage.removeItem('loggedBlogListUser')
    dispathc(clearUser())
  }
}

export default authSlice.reducer
