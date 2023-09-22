const BorrowerController = require('../controllers/Borrower/BorrowerController');

module.exports = function (app) {
    app.get("/borrowers", BorrowerController.index);
    app.post("/borrowers", BorrowerController.store);
    app.get("/borrowers/:id", BorrowerController.show);
    app.put("/borrowers/:id/update", BorrowerController.update);
    app.delete("/borrowers/:id/delete", BorrowerController.destroy);
};