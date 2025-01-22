import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  url: '',
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setField(state, action) {
      const { field, value } = action.payload
      state[field] = value
    },
    resetForm(state) {
      state.title = ''
      state.author = ''
      state.url = ''
    },
  },
})

export const { setField, resetForm } = formSlice.actions
export default formSlice.reducer
