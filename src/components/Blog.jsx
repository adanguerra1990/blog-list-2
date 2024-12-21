import React from 'react'

const Blog = ({ blog }) => {
  return (
    <div>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p>{blog.likes}</p>
    </div>
  )
}

export default Blog
