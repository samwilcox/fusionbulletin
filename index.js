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

require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-fs-backend');
const settingsMiddleware = require('./middleware/settingsMiddleware');
const translationMiddleware = require('./middleware/translationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.join(__dirname, '/localization/{{lng}}/{{ns}}.json'),
        },
        fallbackLng: 'en',
        preload: ['en'],
        detection: {
            order: ['querystring', 'cookie', 'header'],
            caches: ['cookie']
        },
        debug: true
    });

const app = express();

// Setup our middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18nextMiddleware.handle(i18next));
app.use(authMiddleware);
app.use(settingsMiddleware);
app.use(translationMiddleware);

// Setup the view engine
app.set('views', path.join(__dirname, 'views/themes', 'default'));
app.set('view engine', 'ejs');

// Load and register all the plugins
const pluginsDir = path.join(__dirname, 'plugins');

fs.readdirSync(pluginsDir).forEach(file => {
    const pluginPath = path.join(pluginsDir, file);

    if (fs.statSync(pluginPath).isDirectory()) {
        try {
            const plugin = require(path.join(pluginPath, 'index.js'));
            plugin(app, {});
        } catch (error) {
            console.error(`Failed to load plugin ${file}:`, error);
        }
    }
});

// Setup our routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});