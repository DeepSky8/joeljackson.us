

const fieldsFilled = (checkFields) => {

    if (checkFields[0] === null || checkFields[0] === '') {
        return false
    } else {
        return (checkFields.findIndex(field => field.length === 0) === -1)
    }
}

export default fieldsFilled