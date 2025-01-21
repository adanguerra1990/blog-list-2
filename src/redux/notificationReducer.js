import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: 'success',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearNotification: state => {
      state.message = null
      state.type = 'success'
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type, timeInSeconds) => {
  return async dispatch => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
