import api from './api'

export const systemLogService = {
  // Get system logs
  async getLogs(params = {}) {
    const response = await api.get('/system-logs', { params })
    return response.data
  },
}
