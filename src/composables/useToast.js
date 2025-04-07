import { useToast } from 'primevue/usetoast'

export const useCustomToast = () => {
  const toast = useToast()
  let isAlertActive = false

  const showSuccessOrErrorToast = (status, detail, summary = status) => {
    toast.add({
      severity: status.toLowerCase(),
      summary,
      detail,
      life: 3000
    })
  }

  const showAlertWithCooldown = (
    toastFunction,
    status,
    detail,
    summary = status,
    duration = 3500
  ) => {
    if (!isAlertActive) {
      isAlertActive = true // Prevent showing multiple alerts
      toastFunction(status, detail, summary) // Trigger the toast
      setTimeout(() => {
        isAlertActive = false // Reset the flag after the alert is dismissed
      }, duration)
    }
  }

  return { showSuccessOrErrorToast, showAlertWithCooldown }
}
