import { startNewLink } from "../actions/cardActions";
import fieldsFilled from "../functions/fieldsFilled";

const saveItem = async (cardState) => {
    const textEntered = fieldsFilled([cardState.title, cardState.body, cardState.link])
    const imageEntered = fieldsFilled([cardState.imageFile])
    const altEntered = fieldsFilled([cardState.altText])
    const error1 = 'Please enter a Title, Body, and Link'
    const error2 = 'Please include an Alternate Text to accompany your image'
    const error3 = 'Please include an image to accompany your Alternate Text'

    if (textEntered && (imageEntered === altEntered)) {
       return startNewLink(cardState)
            // .then(() => {
            //     return true
            // })
            // .catch((error) => {
            //     alert(error)
            // })
        // return true
    } else {

        if (!textEntered) {
            alert(error1)
        } else if (!imageEntered) {
            alert(error3)
        } else if (!altEntered) {
            alert(error2)
        }
        return false
    }


}

export default saveItem