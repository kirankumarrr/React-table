/**
 *
 * @param {Storable Code} tableResponse
 * @param {Filed to be sorted} key
 * @param {Ascending or Descending} sortKey
 */


export const sorting = (tableResponse, key, sortKey) => {
    let result = [];

    if (sortKey === 'asce') {
        result = tableResponse.sort((a, b) => {
            if (typeof a[key] !== 'object') {
                if (typeof b[key] === 'number') {
                    return a[key] - b[key];
                }
                return String(a[key] === undefined ? 0 : a[key]).localeCompare(String(b[key] === undefined ? 0 : b[key]));
            }
            return null;
        });
    } else {
        result = tableResponse.sort((a, b) => {
            if (typeof a[key] !== 'object') {
                if (typeof b[key] === 'number') {
                    return b[key] - a[key];
                }
                return String(b[key] === undefined ? 0 : b[key]).localeCompare(String(a[key] === undefined ? 0 : a[key]));
            }
            return null;
        });
    }
    return result;
};
