import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFileGenerator } from '@/composables/fileGenerator'
import * as XLSX from 'xlsx'

describe('useFileGenerator composable', () => {
  let exportFns

  beforeEach(() => {
    exportFns = useFileGenerator()

    // Mock browser APIs that don’t exist in test environment
    global.URL.createObjectURL = vi.fn(() => 'blob:url')
    global.URL.revokeObjectURL = vi.fn()
    document.body.appendChild = vi.fn()
    document.body.removeChild = vi.fn()
  })

  // ------------------- Excel Export -------------------
  it('should reject exportToExcel if no data is provided', async () => {
    await expect(exportFns.exportToExcel([], 'test.xlsx')).rejects.toThrow(
      'No data provided for Excel export',
    )
  })

  it('should call XLSX utils correctly when exporting valid data', async () => {
    const mockData = [{ name: 'John', age: 30 }]
    const jsonSpy = vi.spyOn(XLSX.utils, 'json_to_sheet').mockReturnValue({})
    const bookNewSpy = vi.spyOn(XLSX.utils, 'book_new').mockReturnValue({})
    const bookAppendSpy = vi.spyOn(XLSX.utils, 'book_append_sheet').mockReturnValue({})
    vi.spyOn(XLSX, 'write').mockReturnValue(new ArrayBuffer(10))

    const result = await exportFns.exportToExcel(mockData, 'users')

    expect(jsonSpy).toHaveBeenCalled()
    expect(bookNewSpy).toHaveBeenCalled()
    expect(bookAppendSpy).toHaveBeenCalled()
    expect(result.success).toBe(true)
    expect(result.fileName).toContain('users_')
  })

  // ------------------- CSV Export -------------------
  it('should reject exportToCSV if no data is provided', async () => {
    await expect(exportFns.exportToCSV([])).rejects.toThrow('No data provided for CSV export')
  })

  it('should generate CSV and resolve successfully', async () => {
    const mockData = [
      ['Name', 'Age'],
      ['John', '30'],
    ]
    const result = await exportFns.exportToCSV(mockData, 'test.csv')
    expect(result.success).toBe(true)
    expect(result.fileName).toBe('test.csv')
  })

  // ------------------- JSON Export (wrapper) -------------------
  it('should export JSON data through exportJsonToExcel successfully', async () => {
    const mockData = [{ id: 1, name: 'Test' }]
    vi.spyOn(exportFns, 'exportToExcel').mockResolvedValue({ success: true })

    const result = await exportFns.exportJsonToExcel(mockData, 'data.xlsx')
    expect(result.success).toBe(true)
  })

  it('should handle JSON export errors gracefully', async () => {
    vi.spyOn(exportFns, 'exportToExcel').mockRejectedValue(new Error('Export failed'))

    const result = await exportFns.exportJsonToExcel([{ a: 1 }])
    expect(result.success).toBe(false)
    expect(result.error).toBe('Export failed')
  })
})
