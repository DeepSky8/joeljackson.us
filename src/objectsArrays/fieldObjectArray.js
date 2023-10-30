import { updateAltText, updateBody, updateLink, updateTitle } from "../actions/cardActions"
import checkURL from "../functions/checkURL"

const fieldObjectArray = [
    {
        label: 'Title: ',
        id: 'title',
        type: 'text',
        action: updateTitle,
    },
    {
        label: 'Body: ',
        id: 'body',
        type: 'text',
        action: updateBody,
    },
    {
        label: 'Link: ',
        id: 'link',
        type: 'text',
        action: updateLink,
    },
    {
        label: 'Alt text: ',
        id: 'altText',
        type: 'text',
        action: updateAltText,
    },

]


const fieldPopulator = ({ cardState, dispatchCardState, theme }) => {
    const fieldFieldsArray = []
    fieldObjectArray.map(({ label, id, type, action }) => {
        const fieldFieldsObject = {
            key: id,
            label,
            id,
            theme,
            type,
            value: cardState[`${id}`],
            placeholder: cardState[`${id}Placeholder`],
            change: (e) => {
                dispatchCardState(action(e.target.value))
            },
            blur: () => {
                const test = checkURL(cardState.link)
                if (id === 'link' && test) {
                    dispatchCardState(updateLink(test))
                }
            },
        }
        fieldFieldsArray.push(fieldFieldsObject)
    })


    return fieldFieldsArray;
}

export default fieldPopulator