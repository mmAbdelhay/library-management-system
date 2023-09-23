const BorrowerController = require('../controllers/Borrower/BorrowerController');

module.exports = function (app) {
    app.get("/borrowers", BorrowerController.index);
    app.get("/borrowers/books", BorrowerController.getAllBorrowedBooks);
    app.put("/borrowers/:id/update", BorrowerController.update);
    app.delete("/borrowers/:id/delete", BorrowerController.destroy);
};