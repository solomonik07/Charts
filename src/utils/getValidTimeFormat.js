const getValidTimeFormat = (date) => {
    const dateObject = new Date(parseInt(date))

    return ((dateObject.getHours() < 10) ? '0' + dateObject.getHours() : dateObject.getHours()) + ':' + ((dateObject.getMinutes() === 0) ? dateObject.getMinutes() + '0' : dateObject.getMinutes())
}

export default getValidTimeFormat
