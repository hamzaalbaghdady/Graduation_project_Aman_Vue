import * as XLSX from 'xlsx'

export function useFileGenerator() {
  /**
   * Export data to Excel file
   */
  const exportToExcel = async (data, fileName = 'export.xlsx', sheetName = 'Sheet1') => {
    return new Promise((resolve, reject) => {
      try {
        if (!data || data.length === 0) {
          reject(new Error('No data provided for Excel export'))
          return
        }

        // 🔹 Sanitize Vue refs / proxies
        const plainData = Array.isArray(data) ? data.map((row) => ({ ...row })) : []

        // 🔹 Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(plainData)

        // 🔹 Equal column widths
        const colCount = Object.keys(plainData[0]).length
        worksheet['!cols'] = Array(colCount).fill({ wch: 20 })

        // 🔹 Style header row
        const headerKeys = Object.keys(plainData[0])
        headerKeys.forEach((key, i) => {
          const cellRef = XLSX.utils.encode_cell({ r: 0, c: i })
          if (!worksheet[cellRef]) return

          worksheet[cellRef].s = {
            font: { bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '4F81BD' } },
            alignment: { horizontal: 'center', vertical: 'center' },
          }
        })

        // 🔹 Create workbook
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

        // 🔹 Export as Blob
        setTimeout(() => {
          try {
            const wbout = XLSX.write(workbook, {
              bookType: 'xlsx',
              type: 'array',
            })

            const blob = new Blob([wbout], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })

            // Include date-time in file name
            const now = new Date()
            const dateStr = now.toISOString().split('T')[0] // YYYY-MM-DD
            const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-') // HH-MM-SS
            fileName = `${fileName}_${dateStr}_${timeStr}.xlsx`

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()

            setTimeout(() => {
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
            }, 100)

            resolve({ success: true, fileName })
          } catch (error) {
            reject(error)
          }
        }, 50)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Export JSON data to Excel
   */
  const exportJsonToExcel = async (
    jsonData,
    fileName = 'data.xlsx',
    sheetName = 'Data',
    columnWidths = null,
  ) => {
    try {
      return await exportToExcel(jsonData, fileName, sheetName, columnWidths, true)
    } catch (error) {
      console.error('JSON export failed:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Generate CSV file from data
   */
  const exportToCSV = async (data, fileName = 'export.csv') => {
    return new Promise((resolve, reject) => {
      try {
        if (!data || data.length === 0) {
          reject(new Error('No data provided for CSV export'))
          return
        }

        setTimeout(() => {
          try {
            const csvContent = data
              .map((row) =>
                row
                  .map((cell) => {
                    const cellString = String(cell).replace(/"/g, '""')
                    return `"${cellString}"`
                  })
                  .join(','),
              )
              .join('\n')

            const blob = new Blob([csvContent], {
              type: 'text/csv;charset=utf-8;',
            })
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()

            setTimeout(() => {
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
              resolve({ success: true, fileName })
            }, 100)
          } catch (error) {
            reject(error)
          }
        }, 50)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Export HTML content to PDF
   */
  const exportToPDF = async (element, fileName = 'document.pdf', options = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Add date-time to filename
        const now = new Date()
        const dateStr = now.toISOString().split('T')[0] // YYYY-MM-DD
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-') // HH-MM-SS
        filename = `${filename}_${dateStr}_${timeStr}.pdf`

        // Default options
        const defaultOptions = {
          margin: 10,
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          ...options,
        }

        // Use setTimeout to avoid blocking UI
        setTimeout(() => {
          try {
            const pdfExport = window ///
              .html2pdf()
              .default()
              .from(element)
              .set(defaultOptions)
              .save()
              .then(() => {
                resolve({ success: true, fileName })
              })
              .catch((error) => {
                reject(error)
              })
          } catch (error) {
            reject(error)
          }
        }, 0)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    exportToExcel,
    exportJsonToExcel,
    exportToCSV,
  }
}
