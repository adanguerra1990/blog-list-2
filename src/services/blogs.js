import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getUser = async userId => {
  console.log(userId)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(
    `http://localhost:3001/api/users/${userId}`,
    config
  )
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  const user = await getUser(response.data.user)
  console.log(user)
  response.data.user = user
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log(response.data)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
}
