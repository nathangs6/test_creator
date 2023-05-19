export function renameKey(obj, oldKey, newKey) {
    if (oldKey === newKey) {
        return ;
    }
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
};

