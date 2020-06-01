import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = 'https://murmuring-inlet-36760.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addPerson = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, addPerson, updatePerson, deletePerson }