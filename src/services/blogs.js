import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  console.log(response.data)
  return response.data
}

export default {
  getAll,
  create,
}
