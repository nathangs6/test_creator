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

function formatChoiceObject(obj) {
    for (key in obj) {
        if (obj[key] === '0') {
            delete obj[key]
        } else {
            newKey = key.match(/(\d+)/g);
            obj[newKey] = Number(obj[key]);
            delete obj[key];
        }
    }
}

function filterObject(obj, val) {
    for (key in obj) {
        if (obj[key] === val) {
            delete obj[key];
        };
    };
};

module.exports = { convertObjectToArray, renameKey, formatChoiceObject };
