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
