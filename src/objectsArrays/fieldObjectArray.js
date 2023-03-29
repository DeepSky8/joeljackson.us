import { startSaveCard, updateAltText, updateBody, updateLink, updateTitle } from "../actions/cardActions"
import checkURL from "../functions/checkURL"

const fieldObjectArray = [
    {
        label: 'Title: ',
        id: 'title',
        type: 'text',
        action: updateTitle,
        test: () => {
            return true
        },
    },
    {
        label: 'Body: ',
        id: 'body',
        type: 'text',
        action: updateBody,
        test: () => {
            return true
        },
    },
    {
        label: 'Link: ',
        id: 'link',
        type: 'text',
        action: updateLink,
        test: checkURL,
    },
    {
        label: 'Alt text: ',
        id: 'altText',
        type: 'text',
        action: updateAltText,
        test: () => {
            return true
        },
    },

]


const fieldPopulator = ({ cardState, dispatchCardState, theme }) => {
    const fieldFieldsArray = []
    fieldObjectArray.map(({ label, id, type, action, test }) => {
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
                const textTest = test(cardState[`${id}`])
                if (cardState.cardKey) {
                    if (id === 'link' && textTest) {
                        return (startSaveCard({ ...cardState, link: textTest }, cardState.cardKey))
                    } else {
                        return (startSaveCard({ ...cardState }, cardState.cardKey))
                    }
                }
            },
        }
        fieldFieldsArray.push(fieldFieldsObject)
    })


    return fieldFieldsArray;
}

export default fieldPopulator