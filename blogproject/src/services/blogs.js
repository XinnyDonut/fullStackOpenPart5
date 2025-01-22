import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

//config object is a special configuration object used by Axios (HTTP client library).
const config = {
  headers:{  // 'headers' is a special property Axios looks for
    Authorization: null //'Authorization' is a standard HTTP header
  }
}

const setToken = (newToken) => {
  token= `Bearer ${newToken}`
  config.headers.Authorization =token
}

const getUser= () => {
  const userJSON=window.localStorage.getItem('username')
  const user=JSON.parse(userJSON)
  return userJSON
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async blogData => {
  const response =await axios.post(baseUrl,blogData,config)
  return response.data
}

const put =async (blogData) => {
  const response=await axios.put(`${baseUrl}/${blogData.id}`,blogData)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll,add,setToken,put,remove,getUser }

