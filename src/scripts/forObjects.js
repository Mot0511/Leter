const forObjects = (obj, callback) => {
    const keys = []
    const values = []

    for (let i in obj){
        keys.push(i)
    }
    keys.forEach(key => {
        callback([key, obj[key]])
    })



}

export default forObjects