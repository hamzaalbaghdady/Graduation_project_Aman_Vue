import Swal from 'sweetalert2'

export function useAlert() {
  const confirmDialog = (title, text, confirmButtonText = 'Yes') => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2',
      },
    })
  }

  const successAlert = (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700',
      },
    })
  }

  const errorAlert = (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700',
      },
    })
  }

  const infoAlert = (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700',
      },
    })
  }

  return {
    confirmDialog,
    successAlert,
    errorAlert,
    infoAlert,
  }
}
