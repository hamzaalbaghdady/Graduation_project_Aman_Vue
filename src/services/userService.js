// src/services/userService.js
import api from './api'

export const userService = {
  // Get all users
  async getUsers(params = {}) {
    const response = await api.get('/users', { params }) // params for filter, sort, ...etc
    return response.data
  },

  // Get single user
  async getUser(id) {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  // Create user
  async createUser(userData) {
    const response = await api.post('/users', userData)
    return response.data
  },

  // Update user
  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  // Delete user
  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },

  // Block user
  async blockUser(id) {
    const response = await api.post(`/users/block/${id}`)
    return response.data
  },
}
