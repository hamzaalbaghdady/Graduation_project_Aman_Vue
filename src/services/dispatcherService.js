import api from './api'

export const dispatcherService = {
  // Get all dispatchers
  async getDispatchers(params = {}) {
    const response = await api.get('/dispatchers', { params })
    return response.data
  },

  // Get dispatcher details
  async getDispatcher(id) {
    const response = await api.get(`/dispatchers/${id}`)
    return response.data
  },

  // Create dispatcher
  async createDispatcher(dispatcherData) {
    const response = await api.post('/dispatchers', dispatcherData)
    return response.data
  },

  // Update dispatcher
  async updateDispatcher(id, dispatcherData) {
    const response = await api.put(`/dispatchers/${id}`, dispatcherData)
    return response.data
  },

  // Delete dispatcher
  async deleteDispatcher(id) {
    const response = await api.delete(`/dispatchers/${id}`)
    return response.data
  },

  // Get dispatcher permissions
  async getPermissions(dispatcherId) {
    const response = await api.get(`/dispatchers/${dispatcherId}/permissions`)
    return response.data
  },

  /**
   * Get dispatcher history
   * @param {*} dispatcherId
   * @returns id, name, action, resource,...
   */
  async getHistory(dispatcherId) {
    const response = await api.get(`/logs?dispatcher=${dispatcherId}`)
    return response.data
  },

  // Get dispatcher assignments
  async getAssignments(dispatcherId) {
    const response = await api.get(`/emergencies?dispatcher=${dispatcherId}`)
    return response.data
  },
}
