import { defaultCardState } from "../reducers/cardReducer"

export const getLocalCardKeys = async (type) => {
    const localKeys = JSON.parse(localStorage.getItem(`${type.toString()}Keys`))
    // console.log('localKeys', localKeys)
    return localKeys ? localKeys : []

    // const searchKey = `${type.toString()}Keys`
    // return JSON.parse(localStorage.getItem(searchKey))
}

export const getLocalCard = (key) => {
    const localCard = JSON.parse(localStorage.getItem(key))
    // console.log('localCard', localCard)
    return localCard ? localCard : defaultCardState
}

// export const localCards = async (type) => {
//     const searchKey = `${type.toString()}Keys`
//     // const result = localStorage.getItem(searchKey)
//     const result = JSON.parse(localStorage.getItem(searchKey))
//     // console.log('result', result)
//     return result
//     // return [defaultCardState];
// }

export const getLocalCards = async (type) => {

    return getLocalCardKeys(type)
        .then((localKeys) => {
            const localCards = [];
            localKeys.forEach(localKey => {
                localCards.push(getLocalCard(localKey))
            });
            return localCards
        })
}

export const clearLocalCards = (keyArray) => {
    keyArray.forEach((key) => {
        localStorage.removeItem(key)
    })
}