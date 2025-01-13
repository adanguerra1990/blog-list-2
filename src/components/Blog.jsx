import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const canDelete = user && blog.user && blog.user.username === user.username

  return (
    <div>
      <div>
        <p>Title: {blog.title}</p>
      </div>
      {visible && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <button onClick={() => handleLike(blog.id)}>Like</button>
          <span>{blog.likes}</span>
          {canDelete && (
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          )}
          <p>Create by: {user.name}</p>
        </div>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
    </div>
  )
}

export default Blog
