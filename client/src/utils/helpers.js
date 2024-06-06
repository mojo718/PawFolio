// Converts datepicker outputs to Unix

export const convertToUnix = (dateTime) => {
  return new Date(dateTime).getTime()
}