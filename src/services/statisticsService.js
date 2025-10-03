import api from './api'

export const statisticsService = {
  // Get all ambulances
  async getCounts() {
    const response = await api.get('/counts')
    return response.data
  },
}
