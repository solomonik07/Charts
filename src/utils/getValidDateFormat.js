const getValidDateFormat = (date) => {
    const dateObject = new Date(parseInt(date))

    return dateObject.getDate()
        + '.' + ((dateObject.getMonth() < 10) ? '0' + (dateObject.getMonth() + 1) : (dateObject.getMonth() + 1))
        + '.' + dateObject.getFullYear()
}

export default getValidDateFormat
