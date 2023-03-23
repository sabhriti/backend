/**
 * returns item from the local storage.
 *
 * @param {string} keyName - A key to identify the data.
 * @returns {any|null} returns the value associated with the key if its exists and is not expired. Returns `null` otherwise
 */
const get = (keyName) => {
    const data = localStorage.getItem(keyName);
    if (!data) {
        return null;
    }

    const item = JSON.parse(data);

    if (Date.now() > item.ttl) {
        localStorage.removeItem(keyName);
        return null;
    }

    return item.value;
}

/**
 * sets item to local storage.
 *
 * @param {string} keyName - A key to identify the value.
 * @param {any} keyValue - A value associated with the key.
 * @param {number} ttl- Time to live in seconds.
 */
const set = (keyName, keyValue, ttl) => {
    const data = {
        value: keyValue,
        ttl: Date.now() + (ttl * 1000),
    }

    localStorage.setItem(keyName, JSON.stringify(data));
}

/**
 * sets item to local storage.
 *
 * @param {string} keyName - A key to identify the value.
 * @param {any} value - A value associated with the key.
 */
const setWithoutTtl = (keyName, value) => {
    localStorage.setItem(keyName, JSON.stringify({value: value}));
}

/**
 * Removes item from local storage
 *
 * @param {string} keyName
 */
const remove = (keyName) => {
    localStorage.removeItem(keyName);
}

export default {
    set,
    setWithoutTtl,
    get,
    remove
}
