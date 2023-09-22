const exportController = require('../controllers/export/exportController')

module.exports = function (app) {
    app.get("/export/borrowing-processes", exportController.exportBorrowingLastMonth);
    app.get("/export/borrowing-processes/overdue", exportController.exportOverdueBorrowingLastMonth);
};

