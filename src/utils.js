const transformToArray = (object) => {
    if (Array.isArray(object)) {
        return object
    }
    return [object]
}


const getCodesFromObj = (array) => {
    array = transformToArray(array)
    const codesObj = {}
    array.forEach(item => {
        codesObj[`${item.code}`] = item.code
    })
    return codesObj
}

module.exports = { transformToArray, getCodesFromObj }