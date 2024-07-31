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

const MongoDBDriver = require('./database/mongodbDriver');
const Config = require('./../config/config');

/**
 * Database factory for instantiating new database connection
 * instances.
 */
class DatabaseFactory {
    /**
     * Constructor that sets up this class.
     */
    constructor() {
        if (!DatabaseFactory.instance) {
            switch (Config.get('DB_DRIVER')) {
                case 'mongodb':
                    DatabaseFactory.instance = new MongoDBDriver();
                    break;
            }
        }

        return DatabaseFactory.instance;
    }
}