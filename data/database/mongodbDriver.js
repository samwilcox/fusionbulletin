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

const { MongoClient } = require('mongodb');
const DatabaseInterface = require('../databaseInterface');
const Config = require('../../config/config');

/**
 * MongoDB database driver.
 */
class MongoDBDriver extends DatabaseInterface {
    /**
     * Constructor that sets up this class.
     */
    constructor() {
        super();

        if (!MongoDBDriver.instance) {
            this.db = null;
            this.uri = Config.get('MONGODB_URI');
            this.dbName = Config.get('MONGODB_DBNAME');
            this.client = new MongoClient(this.uri, {
                useNewUrlParser: Config.get('MONGODB_USENEWURLPARSER'),
                useUnifiedTopology: Config.get('MONGODB_USEUNIFIEDTOPOLOGY')
            });

            MongoDBDriver.instance = this;
        }

        return MongoDBDriver.instance;
    }

    /**
     * Establishes a connection to the database.
     */
    async connect() {
        if (!this.db) {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
        }
    }

    /**
     * Disconnects from the database server.
     */
    async disconnect() {
        if (this.db) {
            await this.client.close();
            this.db = null;
        }
    }

    /**
     * Returns a complete list of all collections in the database.
     */
    async listCollections() {
        await this.connect();
        return await this.db.listCollections().toArray();
    }

    /**
     * Finds multiple documents from the database.
     * @param {string} collection the collection to query
     * @param {Promise<any>} query a promise that resolves with the inserted ID. 
     */
    async find(collection, query) {
        return await this.db.collection(collection).find(query).toArray();
    }

    /**
     * Finds a single document from the database.
     * @param {string} collection the collection to query
     * @param {Promise<any>} query a promise that resolves with the inserted ID. 
     */
    async findOne(collection, query) {
        return await this.db.collection(collection).findOne(query);
    }

    /**
     * Inserts documents into the database.
     * @param {string} collection the collection to insert into
     * @param {object} document the document to insert
     */
    async insert(collection, documents) {
        const result = await this.db.collection(collection).insertMany(documents);
        return result.insertedIds;
    }

    /**
     * Inserts a document into the database.
     * @param {string} collection the collection to insert into
     * @param {object} document the document to insert 
     */
    async insertOne(collection, document) {
        const result = await this.db.collection(collection).insertOne(document);
        return result.insertedId;
    }

    /**
     * Updates documents in the database.
     * @param {string} collection the collection to update
     * @param {object} query the query to match documents against
     * @param {object} update the update query
     */
    async update(collection, query, update) {
        const result = await this.db.collection(collection).updateMany(query, update);
        return result.modifiedCount;
    }

    /**
     * Updates a single document in the database.
     * @param {string} collection the collection to update
     * @param {object} query the query to match documents against
     * @param {object} update the update query 
     */
    async updateOne(collection, query, update) {
        const result = await this.db.collection(collection).updateOne(query, update);
        return result.modifiedCount;
    }

    /**
     * Deletes documents from the database.
     * @param {string} collection the collection to delete from
     * @param {object} query the query to match documents against
     */
    async delete(collection, query) {
        const result = await this.db.collection(collection).deleteMany(query);
        return result.deletedCount;
    }

    /**
     * Deletes a single document from the database.
     * @param {string} collection the collection to delete from
     * @param {object} query the query to match documents against
     */
    async deleteOne(collection, query) {
        const result = await this.db.collection(collection).deleteOne(query);
        return result.deletedCount;
    }

    /**
     * Returns the last inserted id.
     * @param {string} collection the collection to get last id from
     */
    async getLastInsertId(collection) {
        const result = await this.db.collection('lastInsertIds').findOne({ collection });
        return result ? result.getLastInsertId : null;
    }

    /**
     * Returns the total documents count from the given collection.
     * @param {string} collection the collection to count documents from
     * @param {object} query the query to match documents against
     */
    async countDocuments(collection, query) {
        return await this.db.collection(collection).countDocuments(query);
    }
}

module.exports = MongoDBDriver;