function convertObjectToArray(objectData) {
    const arrayData = [];
    for (let key in objectData) {
        arrayData.push(objectData[key]);
    };
    return arrayData;
};

function renameKey(obj, oldKey, newKey) {
    if (oldKey === newKey) {
        return ;
    }
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
};

module.exports = { convertObjectToArray, renameKey };
