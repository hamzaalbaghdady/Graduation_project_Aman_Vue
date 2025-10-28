import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// ✅ Mock vue-router
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useRoute: vi.fn(() => ({
      path: '/dashboard', // ✅ Add this
      params: {},
    })),
    RouterView: { name: 'RouterView', template: '<div><slot /></div>' },
    RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
  }
})

// ✅ Mock composables like useAlert
vi.mock('@/composables/useAlert', () => ({
  useAlert: vi.fn(() => ({
    errorAlert: vi.fn(),
    successAlert: vi.fn(),
  })),
}))

// ✅ Mock services if needed
vi.mock('@/services', () => ({
  emergencyService: {
    getEmergencies: vi.fn(),
  },
  statisticsService: {
    getCounts: vi.fn(),
  },
}))

// ✅ Mock FontAwesome globally
config.global.components = {
  'font-awesome-icon': {
    template: '<span />',
  },
}

// Mock window.location to prevent redirect during test
Object.defineProperty(window, 'location', {
  value: { href: vi.fn() },
  writable: true,
})
