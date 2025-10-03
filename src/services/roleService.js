import api from './api'

export const roleService = {
  // ################-Roles-################

  // Get all roles
  async getRoles() {
    const response = await api.get('/roles')
    return response.data
  },

  // Get role details
  async getRole(id) {
    const response = await api.get(`/roles/${id}`)
    return response.data
  },

  // Create role
  async createRole(roleData) {
    const response = await api.post('/roles', roleData)
    return response.data
  },

  // Update role
  async updateRole(id, roleData) {
    const response = await api.put(`/roles/${id}`, roleData)
    return response.data
  },

  // Delete role
  async deleteRole(id) {
    const response = await api.delete(`/roles/${id}`)
    return response.data
  },

  // ################-Permissions-################

  // Get all permissions
  async getPermissions() {
    const response = await api.get('/permissions')
    return response.data
  },

  // Get permission details
  async getPermission(id) {
    const response = await api.get(`/permissions/${id}`)
    return response.data
  },

  // Create permission
  async createPermission(permissionData) {
    const response = await api.post('/permissions', permissionData)
    return response.data
  },

  // Update permission
  async updatePermission(id, permissionData) {
    const response = await api.put(`/permissions/${id}`, permissionData)
    return response.data
  },

  // Delete permission
  async deletePermission(id) {
    const response = await api.delete(`/permissions/${id}`)
    return response.data
  },

  // ################-Assignments-################

  // Assign permissions to role
  async assignPermissions(roleId, permissions) {
    const response = await api.post(`/roles/${roleId}/permissions`, { permissions })
    return response.data
  },

  // Unassign permissions to role
  async unassignPermissions(roleId, permissionID) {
    const response = await api.delete(`/roles/${roleId}/permissions/${permissionID}`)
    return response.data
  },
}
