const transformToArray = (object)=>{
    if (Array.isArray(object)){
        return object
    }
    return [object]
}

module.exports = {transformToArray}