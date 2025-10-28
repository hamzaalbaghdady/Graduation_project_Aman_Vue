import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from '@/services/authService'
import api from '@/services/api'

// Mock api module
vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => (store[key] = value)),
    removeItem: vi.fn((key) => delete store[key]),
    clear: vi.fn(() => (store = {})),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.localStorage.clear()
  })

  it('should log in successfully and store token + user', async () => {
    const fakeResponse = {
      data: { token: 'abc123', user: { id: 1, name: 'Hamza' } },
    }
    api.post.mockResolvedValueOnce(fakeResponse)

    const credentials = { id: '123', password: 'secret' }
    const result = await authService.login(credentials)

    expect(api.post).toHaveBeenCalledWith('/auth/login', credentials)
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'abc123')
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ id: 1, name: 'Hamza' }),
    )
    expect(result).toEqual(fakeResponse.data)
  })

  it('should handle logout and clear localStorage', async () => {
    api.post.mockResolvedValueOnce({ data: { message: 'Logged out' } })
    localStorage.setItem('auth_token', 'test')
    localStorage.setItem('user', JSON.stringify({ id: 1 }))

    const result = await authService.logout()

    expect(api.post).toHaveBeenCalledWith('/auth/logout')
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token')
    expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    expect(result).toEqual({ message: 'Logged out' })
  })

  it('should call forgotPassword with correct email', async () => {
    api.post.mockResolvedValueOnce({ data: { success: true } })
    const result = await authService.forgotPassword('test@example.com')

    expect(api.post).toHaveBeenCalledWith('/auth/forgot-password', {
      email: 'test@example.com',
    })
    expect(result).toEqual({ success: true })
  })

  it('should reset password with provided data', async () => {
    const resetData = { token: '1234', password: 'newpass' }
    api.post.mockResolvedValueOnce({ data: { status: 'ok' } })

    const result = await authService.resetPassword(resetData)

    expect(api.post).toHaveBeenCalledWith('/auth/reset-password', resetData)
    expect(result).toEqual({ status: 'ok' })
  })

  it('should fetch current user', async () => {
    const user = { id: 1, name: 'Hamza' }
    api.get.mockResolvedValueOnce({ data: user })

    const result = await authService.getCurrentUser()

    expect(api.get).toHaveBeenCalledWith('/auth/user')
    expect(result).toEqual(user)
  })

  it('should refresh token and store it', async () => {
    const response = { data: { token: 'new_token_123' } }
    api.post.mockResolvedValueOnce(response)

    const result = await authService.refreshToken()

    expect(api.post).toHaveBeenCalledWith('/auth/refresh')
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'new_token_123')
    expect(result).toEqual(response.data)
  })
})
