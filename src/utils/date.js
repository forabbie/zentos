const now = new Date()
const year = now.getFullYear()
const month = (now.getMonth() + 1).toString().padStart(2, '0')
export const currentMonth = `${year}-${month}`

export function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate()
}
export function getCurrentMonthDays() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return getMonthDays(year, month)
}
export function getMonthName(month) {
  const monthNames = [
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
  return monthNames[month - 1]
}
export function getDayName(day) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return dayNames[day]
}
export function getDateString(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
export function getDateTimeString(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day}/${month}/${year} ${hours}:${minutes}`
}
export function getDateTimeStringWithSeconds(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
