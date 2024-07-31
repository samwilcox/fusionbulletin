/**
 * FUSION BULLETIN
 * 
 * By Sam Wilcox <sam@fusionbulletin.com>
 * https://www.fusionbulletin.com
 * 
 * This software is released under the MIT license.
 * For further information, please visit:
 * https://license.fusionbulletin.com
 */

/**
 * Interface for all cache drivers to implement.
 */
class CacheInterface {
    /**
     * Constructor that sets up properties.
     */
    constructor() {
        if (new.target === CacheInterface) {
            throw new TypeError("Cannot construct CacheInterface instances directly");
        }

        this.cache = {};

        this.collections = [
            'users'
        ];
    }

    /**
     * Initializes the cache.
     */
    async initialize() {
        throw new Error("Method 'initialize()' must be implemented.");
    }

    /**
     * Updates the given collection into the cache.
     * @param {string} collection the collection to update
     */
    async update(collection) {
        throw new Error("Method 'update()' must be implemented.");
    }

    /**
     * Performs a batch update to multiple collections into the cache.
     * @param {array} collections the collection of collections to update
     */
    async updateAll(collections = []) {
        throw new Error("Method 'batchUpdate()' must be implemented.");
    }

    /**
     * Returns the cached data for the given collection.
     * @param {string} collection the collection to get from
     */
    get(collection) {
        throw new Error("Method 'get()' must be implemented.");
    }

    /**
     * Returns the cached data for the given collections.
     * @param {string} collection the collections to get from
     */
    getAll(collections = []) {
        throw new Error("Method 'batchGet()' must be implemented.");
    }
}

module.exports = CacheInterface;