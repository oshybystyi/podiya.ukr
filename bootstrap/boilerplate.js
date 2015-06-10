
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    path = require('path'),
    express = require('express'),
    multer = require('multer');

module.exports = function(app) {
    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use(favicon(__dirname + '/../public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // handle multipart/form-data
    app.use(multer({
        dest: './public/uploads/event-images', // so far all the files are event images
        rename: function(fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
        }
    }));

    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
}
