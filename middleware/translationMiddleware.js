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

const fs = require('fs');
const path = require('path');
const Config = require('../config/config');

// Loads the translation files into memory
const loadTranslations = () => {
    const translations = {};
    const languages = fs.readdirSync(path.join(__dirname, '../localization'));

    languages.forEach(lang => {
        translations[lang] = {};
        const files = fs.readdirSync(path.join(__dirname, '../localization', lang));

        files.forEach(file => {
            const filePath = path.join(__dirname, '../localization', lang, file);
            const key = path.basename(file, '.json');
            translations[lang][key] = JSON.parse.parse(fs.readFileSync(filePath, 'utf8'));
        });
    });

    return translations;
};

const translations = loadTranslations();

/**
 * Middleware that determines the correct localization and then
 * offers a function to translate each key.
 * @param {object} req the HTTP request object
 * @param {object} res the HTTP response object
 * @param {object} next the next middleware function in the stack
 */
const translationMiddleware = (req, res, next) => {
    const defaultLanguage = Config.defaultLanguage;
    let lang = defaultLanguage;

    // Check if the user is signed in and has a language setting
    if (req.user && req.user.languages) {
        lang = req.user.language;
    }

    // Fallback to default language if the detected language is not supported
    if (!translations[lang]) {
        lang = defaultLanguage;
    }

    // Function to translate a key
    req.t = (key, ns = 'common') => {
        return translations[lang][ns][key] || translations[defaultLanguage][ns][key] || key;
    };

    res.locals.lang = lang;

    next();
};

module.exports = translationMiddleware;