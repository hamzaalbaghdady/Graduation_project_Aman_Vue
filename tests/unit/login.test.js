import { mount, flushPromises } from '@vue/test-utils'
import Login from '@/views/login.vue'
import authService from '@/services'
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock the authService
vi.mock('@/services', () => ({
  default: {
    login: vi.fn(),
  },
}))

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        stubs: ['router-link', 'router-view'],
      },
    })
  })

  it('renders login form correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Login')
    expect(wrapper.find('#id').exists()).toBe(true)
    expect(wrapper.find('#password').exists()).toBe(true)
  })

  it('calls login service with correct credentials', async () => {
    const mockResponse = { status: true }
    authService.default.login.mockResolvedValueOnce(mockResponse)

    await wrapper.find('#id').setValue('12345')
    await wrapper.find('#password').setValue('password')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(authService.default.login).toHaveBeenCalledWith({
      id: '12345',
      password: 'password',
    })
  })

  it('shows error message when login fails', async () => {
    const mockResponse = { status: false, message: 'Invalid credentials' }
    authService.default.login.mockResolvedValueOnce(mockResponse)

    await wrapper.find('#id').setValue('99999')
    await wrapper.find('#password').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Login failed')
  })
})
