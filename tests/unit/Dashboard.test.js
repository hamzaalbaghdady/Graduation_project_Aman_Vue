import { mount, flushPromises } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'
import { vi } from 'vitest'
import { useAlert } from '@/composables/useAlert'
import emergencyService from '@/services/emergencyService'

vi.mock('@/composables/useAlert')
vi.mock('@/services/emergencyService')

describe('Dashboard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders dashboard title', async () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.text()).toContain('Dashboard')
  })

  it('calls exportToExcel when downloadExcel is triggered', async () => {
    const wrapper = mount(Dashboard)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(emergencyService.exportToExcel).toHaveBeenCalled()
  })

  it('calls loadData on mount and sets emergencies', async () => {
    const mockData = [{ id: 1, name: 'Emergency 1' }]
    emergencyService.getEmergencies.mockResolvedValue(mockData)
    const wrapper = mount(Dashboard)
    await flushPromises()
    expect(wrapper.vm.emergencies).toEqual(mockData)
  })

  it('shows errorAlert on loadData failure', async () => {
    const mockErrorAlert = vi.fn()
    useAlert.mockReturnValue({ errorAlert: mockErrorAlert })
    emergencyService.getEmergencies.mockRejectedValue(new Error('Network error'))
    const wrapper = mount(Dashboard)
    await flushPromises()
    expect(mockErrorAlert).toHaveBeenCalled()
  })
})
