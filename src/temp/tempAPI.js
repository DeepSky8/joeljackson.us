import { made, found } from "./tempData"

const sleep = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 2000))
}

export const getItems = async (type) => {
    await sleep()
    return type.toString() === 'found' ? found : made
}

// const [local, setLocal] = useLocalStorageState('jj' + type.toString())

// if (local.savedTime + 30000 <= getTime()) {
//     await sleep()
//     setLocal({
//         savedTime: getTime(),
//         data: type.toString() === 'found' ? found : made
//     })
// }
// return local.data