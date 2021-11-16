export const reqField = value => {
  if (value) return undefined
  return "Пустое поле"
}

export const maxLenghtCreator = (maxLength) => value => {
  if (value.length > maxLength) return `Max lenght is ${maxLength} simbols`

  return undefined
}