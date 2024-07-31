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

const CacheInterface = require('../cacheInterface');
const Config = require('../../config/config');
const DatabaseFactory = require('../databaseFactory');

/**
 * Cache driver for no caching.
 */
class NoCacheDriver extends CacheInterface {
    /**
     * Constructor that sets up this class.
     */
    constructor() {
        this.db = new DatabaseFactory();
    }

    /**
     * Initializes the cache.
     */
    async initialize() {
        await this.build();
    }

    /**
     * Builds the cache for all collections.
     */
    async build() {
        const collections = await this.db.listCollections();

        for (const collection of collections) {
            await this.update(collection.name);
        }
    }

    /**
     * Updates the given collection into the cache.
     * @param {string} collection the collection to update
     */
    async update(collection) {
        const query = {};
        const records = await this.db.find(collection, query);
        this.cache[collection] = records;
    }

    /**
     * Performs a batch update to multiple collections into the cache.
     * @param {array} collections the collection of collections to update
     */
    async updateAll(collections = []) {
        for (const collection of collections) {
            await this.update(collection);
        }
    }

    /**
     * Returns the cached data for the given collection.
     * @param {string} collection the collection to get from
     */
    get(collection) {
        return this.cache[collection] || [];
    }

    /**
     * Returns the cached data for the given collections.
     * @param {string} collection the collections to get from
     */
    getAll(collections = []) {
        const result = {};

        for (const collection of collections) {
            result[collection] = this.get(collection);
        }

        return result;
    }
}

module.exports = NoCacheDriver;