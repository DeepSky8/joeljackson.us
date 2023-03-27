const processLocalCards = (localCardKeys, cloudKeys) => {


    localCards.filter((localKey) => {


        return !cloudKeys.includes(localKey)
    })
}

export default processLocalCards