const BookController = require('../controllers/Book/BookController');

module.exports = function (app) {
    app.get("/books", BookController.index);
    app.post("/books", BookController.store);
    app.get("/books/:id", BookController.show);
    app.put("/books/:id/update", BookController.update);
    app.delete("/books/:id/delete", BookController.destroy);
};