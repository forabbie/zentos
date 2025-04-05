export function formatToPHP(number) {
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  })

  return formatter.format(number)
}
