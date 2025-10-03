import api from './api'

export const emergencyService = {
  // Get all emergencies
  async getEmergencies(params = {}) {
    const response = await api.get('/emergencies', { params })
    return response.data
  },

  // Get emergency details
  async getEmergency(id) {
    const response = await api.get(`/emergencies/${id}`)
    return response.data
  },

  // Create emergency
  async createEmergency(emergencyData) {
    const response = await api.post('/emergencies', emergencyData)
    return response.data
  },

  // Update emergency
  async updateEmergency(id, emergencyData) {
    const response = await api.put(`/emergencies/${id}`, emergencyData)
    return response.data
  },

  // Update emergency status
  async updateStatus(id, status, notes = '') {
    const response = await api.patch(`/emergencies/${id}/status`, { status, notes })
    return response.data
  },

  // -----------------------------------------------------------

  // Assign ambulance to emergency
  async assignAmbulance(emergencyId, ambulanceId) {
    const response = await api.post(`/emergencies/${emergencyId}/assign-ambulance`, {
      ambulance_id: ambulanceId,
    })
    return response.data
  },

  // Get emergency timeline
  async getTimeline(emergencyId) {
    const response = await api.get(`/emergencies/${emergencyId}/timeline`)
    return response.data
  },

  // Search emergencies
  async searchEmergencies(searchParams) {
    const response = await api.get('/emergencies/search', { params: searchParams })
    return response.data
  },
}
