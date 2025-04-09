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

  // Create a new Date object from the date string
  const date = new Date(dateString)

  // Extract the components
  // const dayOfWeek = days[date.getUTCDay()]
  const dayOfMonth = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  // Return the date in words
  return `${month} ${dayOfMonth}, ${year}`
}
