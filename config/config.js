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
 * Application configurations object.
 */
class Config {
    /**
     * Initializes the application configurations.
     */
    static initialize() {
        Config.configs = {};

        for (const [key, value] of Object.entries(process.env)) {
            Config.configs[key] = value;
        }

        // TO-DO: Load from database
    }

    /**
     * Returns the value for the given key.
     * @param {string} key the key of the config to return 
     */
    static get(key) {
        if (Config.configs && Config.configs.hasOwnProperty(key)) {
            return Config.configs[key];
        }

        return null;
    }

    /**
     * Returns the entire configuration object instance.
     */
    static getAll() {
        return Config.configs || {};
    }
}

module.exports = Config;