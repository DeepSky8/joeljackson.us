

const themeArray = [
    'green',
    'blue',
    'black',
    'white',

]

const themeIterator = (currentTheme) => {
    const currentIndex = themeArray.indexOf(currentTheme)
    if (currentIndex < (themeArray.length - 1)) {
        return themeArray[(currentIndex + 1)]
    } else {
        return themeArray[0]
    }
}

export default themeIterator