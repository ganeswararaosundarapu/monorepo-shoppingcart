/**
 * Override the format and compareMessages functions
 * to format messages where manage translation supports like [{id: id, defaultMessage: msg}]
 */
const messages = []
const format = (msgs) => {
  for (const key in msgs) {
    messages.push({
      id: key,
      defaultMessage: msgs[key].defaultMessage
    })
  }
  return messages
}
const sortOrder = 1 // decending order
const compareMessages = () => {
  return sortOrder
}

module.exports = { format, compareMessages }