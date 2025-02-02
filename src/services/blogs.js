import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getUser = async userId => {
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

  const response = await axios.post(baseUrl, newObject, config)
  const user = await getUser(response.data.user)
  response.data.user = user
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getComments = async id => {
  const response = await axios.get(`${baseUrl}${id}/comments`)
  console.log('grtComments', response.data)
  return response.data
}

const createComments = async (id, comment) => {
  const response = await axios.post(`${baseUrl}${id}/comments`, comment)
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  getComments,
  createComments,
}
