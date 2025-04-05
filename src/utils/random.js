const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomMoney() {
  const amount = randomInt(99.99, 10000.99)
  return amount
}

export function randomString(length) {
  let result = ''
  const characters = alphabet
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
