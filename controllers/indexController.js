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
 * Index controller.
 */
const indexController = {
    index: (req, res) => {
        res.render('index', {});
    }
};

module.exports = indexController;