import api from './api'

export const ambulanceService = {
  // Get all ambulances
  async getAmbulances(params = {}) {
    const response = await api.get('/ambulances', { params })
    return response.data
  },

  // Get ambulance details
  async getAmbulance(id) {
    const response = await api.get(`/ambulances/${id}`)
    return response.data
  },

  // Create ambulance
  async createAmbulance(ambulanceData) {
    const response = await api.post('/ambulances', ambulanceData)
    return response.data
  },

  // Update ambulance
  async updateAmbulance(id, ambulanceData) {
    const response = await api.put(`/ambulances/${id}`, ambulanceData)
    return response.data
  },

  // Delete ambulance
  async deleteAmbulance(id) {
    const response = await api.delete(`/ambulances/${id}`)
    return response.data
  },

  // Update ambulance status
  async updateStatus(id, status) {
    const response = await api.patch(`/ambulances/${id}/status`, { status })
    return response.data
  },

  // Get ambulance history
  async getLocationHistory(id) {
    const response = await api.get(`/logs?ambulance=${id}`)
    return response.data
  },
}
