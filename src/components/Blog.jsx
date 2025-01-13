const Blog = ({ blog, handleLike }) => {
  return (
    <div>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <button onClick={() => handleLike(blog.id)}>Like</button>
      <span>{blog.likes}</span>
    </div>
  )
}

export default Blog
