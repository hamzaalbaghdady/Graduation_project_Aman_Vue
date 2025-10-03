import api from './api'

export const profileService = {
  // Get user profile
  async getProfile() {
    // TODO
    const response = await api.get('/profile')
    return response.data
  },

  // Update profile
  async updateProfile(profileData) {
    const response = await api.put('/profile', profileData)
    return response.data
  },

  // Change password
  async changePassword(passwordData) {
    const response = await api.put('/profile/password', passwordData)
    return response.data
  },

  // Update avatar
  async updateAvatar(avatarFile) {
    const formData = new FormData()
    formData.append('avatar', avatarFile)

    const response = await api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}
