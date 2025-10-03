import api from './api'

export const ambulanceStaffService = {
  // ################-Members-################
  // Get all staff
  async getStaff(params = {}) {
    const response = await api.get('/members', { params })
    return response.data
  },

  // Get staff details
  async getStaffMember(id) {
    const response = await api.get(`/members/${id}`)
    return response.data
  },

  // Create staff member
  async createStaff(staffData) {
    const response = await api.post('/members', staffData)
    return response.data
  },

  // Update staff member
  async updateStaff(id, staffData) {
    const response = await api.put(`/members/${id}`, staffData)
    return response.data
  },

  // Delete staff member
  async deleteStaff(id) {
    const response = await api.delete(`/members/${id}`)
    return response.data
  },

  // ################-Crews-################

  // Get all crews
  async getAllCrews(params = {}) {
    const response = await api.get('/crews', { params })
    return response.data
  },

  // Get crew details
  async getCrew(id) {
    const response = await api.get(`/crews/${id}`)
    return response.data
  },

  // Create crew
  async createCrew(crewData) {
    const response = await api.post('/crews', crewData)
    return response.data
  },

  // Update crew
  async updateCrew(id, crewData) {
    const response = await api.put(`/crews/${id}`, crewData)
    return response.data
  },

  // Delete crew
  async deleteCrew(id) {
    const response = await api.delete(`/crews/${id}`)
    return response.data
  },

  // ################-Assignments-################

  // Assign crew to ambulance
  async assignToAmbulance(crewId, ambulanceId) {
    const response = await api.post(`/crew/${crewId}/ambulance/${ambulanceId}`)
    return response.data
  },
  // Unassign crew to ambulance
  async unassignToAmbulance(crewId, ambulanceId) {
    const response = await api.delete(`/crew/${crewId}/ambulance/${ambulanceId}`)
    return response.data
  },

  // Assign members to crew
  async assignToCrew(members, crewId) {
    const response = await api.post(`/crew/${crewId}/members/`, { members })
    return response.data
  },
  // Unassign members to crew
  async unassignToCrew(memberId, crewId) {
    const response = await api.delete(`/crew/${crewId}/members/${memberId}`)
    return response.data
  },

  // ################-History-################

  // Get crew assignments
  async getAssignments(crewId) {
    const response = await api.get(`/crews/${crewId}/assignments`)
    return response.data
  },
}
