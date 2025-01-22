import axios from 'axios'
const baseUrl = '/api/login'

const login= async creditionals => {
  const response= await axios.post(baseUrl,creditionals)
  const result=response.data
  return result
}

export default { login }