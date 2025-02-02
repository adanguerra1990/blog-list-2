import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import formReducer from './formReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import formCommentsReducer from './formCommentsReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    form: formReducer,
    auth: authReducer,
    users: usersReducer,
    formComment: formCommentsReducer,
  },
})

export default store
