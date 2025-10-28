import { describe, it, expect, vi, beforeEach } from 'vitest'
import { emergencyService } from '@/services/emergencyService'
import api from '@/services/api'

// Mock api module
vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('emergencyService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch all emergencies', async () => {
    const mockData = [{ id: 1, type: 'Medical' }]
    api.get.mockResolvedValueOnce({ data: mockData })

    const result = await emergencyService.getEmergencies({ status: 'active' })

    expect(api.get).toHaveBeenCalledWith('/emergencies', { params: { status: 'active' } })
    expect(result).toEqual(mockData)
  })

  it('should fetch emergency types', async () => {
    const mockData = ['Medical', 'Fire']
    api.get.mockResolvedValueOnce({ data: mockData })

    const result = await emergencyService.getEmergencyTypes()

    expect(api.get).toHaveBeenCalledWith('/emergencies/types', { params: {} })
    expect(result).toEqual(mockData)
  })

  it('should fetch a single emergency by id', async () => {
    const mockData = { id: 1, type: 'Fire' }
    api.get.mockResolvedValueOnce({ data: mockData })

    const result = await emergencyService.getEmergency(1)

    expect(api.get).toHaveBeenCalledWith('/emergencies/1')
    expect(result).toEqual(mockData)
  })

  it('should create a new emergency', async () => {
    const newEmergency = { type: 'Medical', location: 'Gaza' }
    const mockResponse = { success: true }
    api.post.mockResolvedValueOnce({ data: mockResponse })

    const result = await emergencyService.createEmergency(newEmergency)

    expect(api.post).toHaveBeenCalledWith('/emergencies', newEmergency)
    expect(result).toEqual(mockResponse)
  })

  it('should update an existing emergency', async () => {
    const updated = { type: 'Fire', status: 'Resolved' }
    const mockResponse = { updated: true }
    api.put.mockResolvedValueOnce({ data: mockResponse })

    const result = await emergencyService.updateEmergency(1, updated)

    expect(api.put).toHaveBeenCalledWith('/emergencies/1', updated)
    expect(result).toEqual(mockResponse)
  })

  it('should update emergency status', async () => {
    const mockResponse = { success: true }
    api.patch.mockResolvedValueOnce({ data: mockResponse })

    const result = await emergencyService.updateStatus(5, 'Completed', 'All clear')

    expect(api.patch).toHaveBeenCalledWith('/emergencies/5/status', {
      status: 'Completed',
      notes: 'All clear',
    })
    expect(result).toEqual(mockResponse)
  })

  it('should assign an ambulance to an emergency', async () => {
    const mockResponse = { assigned: true }
    api.post.mockResolvedValueOnce({ data: mockResponse })

    const result = await emergencyService.assignAmbulance(10, 3)

    expect(api.post).toHaveBeenCalledWith('/emergencies/10/assign-ambulance', {
      ambulance_id: 3,
    })
    expect(result).toEqual(mockResponse)
  })

  it('should get an emergency timeline', async () => {
    const mockTimeline = [{ status: 'Dispatched', time: '10:00 AM' }]
    api.get.mockResolvedValueOnce({ data: mockTimeline })

    const result = await emergencyService.getTimeline(7)

    expect(api.get).toHaveBeenCalledWith('/emergencies/7/timeline')
    expect(result).toEqual(mockTimeline)
  })

  it('should search emergencies with query params', async () => {
    const mockResult = [{ id: 1, keyword: 'fire' }]
    const searchParams = { q: 'fire', date: '2025-10-27' }

    api.get.mockResolvedValueOnce({ data: mockResult })

    const result = await emergencyService.searchEmergencies(searchParams)

    expect(api.get).toHaveBeenCalledWith('/emergencies/search', { params: searchParams })
    expect(result).toEqual(mockResult)
  })
})
