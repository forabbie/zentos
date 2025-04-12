export const createId = (counter) => {
  return ++counter
}

export const hexToRgb = (hex) => {
  // Remove the leading '#' if it exists
  hex = hex.replace(/^#/, '')

  // Check if the hex is 3 characters (short form)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  // Convert the hex values to decimal
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Return the RGB values as an object
  return { r, g, b }
}

export function formatToCurrency(number) {
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  })

  return formatter.format(number)
}

export const returnColor = (key) => {
  switch (key) {
    case 'red':
      return { text: 'text-red-500', bg: 'bg-red-50' }

    case 'amber':
      return { text: 'text-red-500', bg: 'bg-red-50' }

    case 'orange':
      return { text: 'text-orange-500', bg: 'bg-orange-50' }

    case 'blue':
      return { text: 'text-blue-500', bg: 'bg-blue-50' }

    case 'green':
      return { text: 'text-green-500', bg: 'bg-green-50' }

    case 'teal':
      return { text: 'text-teal-500', bg: 'bg-teal-50' }

    case 'sky':
      return { text: 'text-sky-500', bg: 'bg-sky-50' }

    case 'violet':
      return { text: 'text-violet-500', bg: 'bg-violet-50' }

    case 'purple':
      return { text: 'text-purple-500', bg: 'bg-purple-50' }

    case 'pink':
      return { text: 'text-pink-500', bg: 'bg-pink-50' }

    case 'rose':
      return { text: 'text-rose-500', bg: 'bg-rose-50' }

    default:
      return { text: 'text-gray-500', bg: 'bg-gray-50' }
  }
}
