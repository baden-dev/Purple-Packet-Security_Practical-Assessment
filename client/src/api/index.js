import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const getAllAgents = () => api.get(`/agents`)
export const getAllHardware = () => api.get(`/hardwares`)
export const getAllSoftware = () => api.get(`/packages`)
export const getAllVulnerabilities = () => api.get(`/vulnerabilities`)


const apis = {
    getAllAgents,
    getAllHardware,
    getAllSoftware,
    getAllVulnerabilities,
}

export default apis