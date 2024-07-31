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
 * Middleware for authenticating users.
 * @param {object} req the HTTP request object
 * @param {object} res the HTTP response object
 * @param {object} next the next middleware function in the stack
 */
const authMiddleware = (req, res, next) => {
    next();
};