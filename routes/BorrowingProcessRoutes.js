const BorrowingProcessController = require('../controllers/BorrowingProcess/BorrowingprocessController');

module.exports = function (app) {
    app.get("/borrowing-processes", BorrowingProcessController.index);
    app.get("/borrowing-processes/overdue", BorrowingProcessController.overdue);
    app.post("/borrowing-processes/checkout", BorrowingProcessController.checkout);
    app.delete("/borrowing-processes/:id/return", BorrowingProcessController.return);
};