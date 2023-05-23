function convertObjectToArray(objectData) {
    const arrayData = [];
    for (let key in objectData) {
        arrayData.push(objectData[key]);
    };
    return arrayData;
};

export default convertObjectToArray
