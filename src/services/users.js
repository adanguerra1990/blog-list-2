import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users/'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  console.log('serviUsers..', response.data)
  return response.data
}

export default { getAllUsers }
