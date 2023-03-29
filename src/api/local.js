import { defaultCardState } from "../reducers/cardReducer"

const getLocalCardKeys = async (type) => {
    const localKeys = JSON.parse(localStorage.getItem(`${type.toString()}Keys`))
    return localKeys ? localKeys : []
}

const getLocalCard = (key) => {
    const localCard = JSON.parse(localStorage.getItem(key))
    // console.log('localCard', localCard)
    return localCard ? localCard : defaultCardState
}

const getLocalCards = async (type) => {

    return getLocalCardKeys(type)
        .then((localKeys) => {
            const localCards = [];
            localKeys.forEach(localKey => {
                localCards.push(getLocalCard(localKey))
            });
            return localCards
        })
}

const clearLocalCards = (keyArray) => {
    keyArray.forEach((key) => {
        localStorage.removeItem(key)
    })
}