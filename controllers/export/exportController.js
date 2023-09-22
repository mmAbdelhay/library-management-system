const BorrowingProcessRepository = require("../../repositories/BorrowingProcessRepository");
const ExcelJS = require('exceljs');

const columns = ['process id', 'created at', 'return date', 'book title', 'book Author', 'ISBN', 'borrower name', 'borrower email'];

const rows = (borrowingProcess) => {
    return [borrowingProcess.id, borrowingProcess.createdAt, borrowingProcess.returnDate,
        borrowingProcess.Book.title, borrowingProcess.Book.author, borrowingProcess.Book.ISBN,
        borrowingProcess.Borrower.name, borrowingProcess.Borrower.email
    ]
}

module.exports.exportBorrowingLastMonth = async (req, res) => {
    try {
        const borrowingProcesses = await BorrowingProcessRepository.findAllLastMonth();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('borrowing-processes-last-month');
        worksheet.addRow(columns);
        borrowingProcesses.forEach((borrowingProcess) => {
            worksheet.addRow(rows(borrowingProcess));
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=borrowing-processes-last-month.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.exportOverdueBorrowingLastMonth = async (req, res) => {
    try {
        const borrowingProcesses = await BorrowingProcessRepository.findAllOverdueLastMonth();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('borrowing-processes-overdue-last-month');
        worksheet.addRow(columns);
        borrowingProcesses.forEach((borrowingProcess) => {
            worksheet.addRow(rows(borrowingProcess));
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=borrowing-processes-overdue-last-month.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};