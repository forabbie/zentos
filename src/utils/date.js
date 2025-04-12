const now = new Date()
const month = (now.getMonth() + 1).toString().padStart(2, '0')

export const year = now.getFullYear()

export const currentMonth = `${year}-${month}`

export const convertToMonthYear = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${year}-${month}`
}

export function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate()
}

export function getCurrentMonthDays() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return getMonthDays(year, month)
}

export function getDateString(dateString) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function convertDateToWords(dateString) {
  // Parse the input string as UTC
  const utcDate = new Date(dateString)

  // Convert to Philippine Time (UTC+8)
  const phTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Extract components from the Philippine time date
  const dayOfWeek = days[phTime.getDay()]
  const dayOfMonth = phTime.getDate()
  const month = months[phTime.getMonth()]
  const year = phTime.getFullYear()

  // Optional: include day of week
  // return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`
  return `${month} ${dayOfMonth}, ${year}`
}
