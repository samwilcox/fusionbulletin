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
 * Interface for all database drivers to implement.
 */
class DatabaseInterface {
    /**
     * Establishes a connection to the database.
     */
    async connect() {
        throw new Error("Method 'connect()' must be implemented.");
    }

    /**
     * Disconnects from the database server.
     */
    async disconnect() {
        throw new Error("Method 'disconnect()' must be implemented.");
    }

    /**
     * Finds multiple documents from the database.
     * @param {string} collection the collection to query
     * @param {Promise<any>} query a promise that resolves with the inserted ID. 
     */
    async find(collection, query) {
        throw new Error("Method 'find()' must be implemented.");
    }

    /**
     * Finds a single document from the database.
     * @param {string} collection the collection to query
     * @param {Promise<any>} query a promise that resolves with the inserted ID. 
     */
    async findOne(collection, query) {
        throw new Error("Method 'findOne()' must be implemented.");
    }

    /**
     * Inserts documents into the database.
     * @param {string} collection the collection to insert into
     * @param {object} document the document to insert
     */
    async insert(collection, documents) {
        throw new Error("Method 'insert()' must be implemented.");
    }

    /**
     * Inserts a document into the database.
     * @param {string} collection the collection to insert into
     * @param {object} document the document to insert 
     */
    async insertOne(collection, document) {
        throw new Error("Method 'insertOne()' must be implemented.");
    }

    /**
     * Updates documents in the database.
     * @param {string} collection the collection to update
     * @param {object} query the query to match documents against
     * @param {object} update the update query
     */
    async update(collection, query, update) {
        throw new Error("Method 'update()' must be implemented.");
    }

    /**
     * Updates a single document in the database.
     * @param {string} collection the collection to update
     * @param {object} query the query to match documents against
     * @param {object} update the update query 
     */
    async updateOne(collection, query, update) {
        throw new Error("Method 'updateOne()' must be implemented.");
    }

    /**
     * Deletes documents from the database.
     * @param {string} collection the collection to delete from
     * @param {object} query the query to match documents against
     */
    async delete(collection, query) {
        throw new Error("Method 'delete()' must be implemented.");
    }

    /**
     * Deletes a single document from the database.
     * @param {string} collection the collection to delete from
     * @param {object} query the query to match documents against
     */
    async deleteOne(collection, query) {
        throw new Error("Method 'deleteOne()' must be implemented.");
    }

    /**
     * Returns the last inserted id.
     * @param {string} collection the collection to get last id from
     */
    async getLastInsertId(collection) {
        throw new Error("Method 'getLastInsertId()' must be implemented.");
    }

    /**
     * Returns the total documents count from the given collection.
     * @param {string} collection the collection to count documents from
     * @param {object} query the query to match documents against
     */
    async countDocuments(collection, query) {
        throw new Error("Method 'countDocuments()' must be implemented.");
    }
}