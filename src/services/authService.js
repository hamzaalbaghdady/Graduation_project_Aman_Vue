// src/services/authService.js
import api from './api'

export const authService = {
  // Login
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Logout
  async logout() {
    const response = await api.post('/auth/logout')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    return response.data
  },

  // Forgot Password
  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Reset Password
  async resetPassword(resetData) {
    const response = await api.post('/auth/reset-password', resetData)
    return response.data
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/user')
    return response.data
  },

  // Refresh token
  async refreshToken() {
    const response = await api.post('/auth/refresh')
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token)
    }
    return response.data
  },
}
