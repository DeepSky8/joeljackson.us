export const starSort = (a, b) => {
    if (a.starStatus === 'selected') {
        return -1
    } else if (b.starStatus === 'selected') {
        return 1
    } else {
        return 0
    }
}