import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, blogToUpdate) => {
    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
    return response.data
}

const addComment = async (id, comment) => {
    console.log(id, comment)
    const body = { comment }
    await axios.post(`${baseUrl}/${id}/comments`, body)
}

const deleteBlog = async id => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { setToken, getAll, create, update, deleteBlog,  addComment }