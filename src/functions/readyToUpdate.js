import checkURL from "./checkURL";
import fieldsFilled from "./fieldsFilled";


const readyToUpdate = (cardState) => {
    const validationObjectsArray = [
        {
            test: fieldsFilled([cardState.title, cardState.body]),
            error: 'Please enter a Title and Body'
        },
        {
            test: fieldsFilled([cardState.link]),
            error: 'Please enter a Link'
        },
        {
            test: checkURL(cardState.link),
            error: 'Please double-check the Link'
        },
        {
            test: cardState.altText ? (fieldsFilled([cardState.imageFile]) || fieldsFilled([cardState.imageURL])) : true,
            error: 'Please include an image to accompany your Alternate Text'
        },
        {
            test: (cardState.imageFile || cardState.imageURL) ? fieldsFilled([cardState.altText]) : true,
            error: 'Please include an Alternate Text to accompany your image'
        },
        {
            test: fieldsFilled([cardState.userUID]),
            error: 'You somehow created an item without authentication. Stop right there.'
        }
    ]

    const failedTestIndex = validationObjectsArray.map(obj => obj.test).indexOf(false)

    if (failedTestIndex > -1) {
        alert(validationObjectsArray[failedTestIndex].error)
        return false
    } else if (failedTestIndex === -1) {
        return true
    }
}

export default readyToUpdate
