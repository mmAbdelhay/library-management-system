const exportController = require('../controllers/export/exportController')

module.exports = function (app) {
    app.get("/export/books", exportController.exportAllBooks);
};

