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

const Config = require('../config/config');

/**
 * Middleware to load the application settings so that they are ready
 * when we need them.
 * @param {object} req the HTTP request object
 * @param {object} res the HTTP response object
 * @param {object} next the next middleware function in the stack
 */
const settingsMiddleware = (req, res, next) => {
    const settings = new Config();
    req.settings = settings.getAll();
    next();
};

module.exports = settingsMiddleware;