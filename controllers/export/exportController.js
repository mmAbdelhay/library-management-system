const BookRepository = require("../../repositories/BookRepository");
const ExcelJS = require('exceljs');

module.exports.exportAllBooks = async (req, res) => {
    try {
        const books = await BookRepository.findAll();

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Books');

        // Add headers to the worksheet
        worksheet.addRow(['Title', 'Author', 'ISBN']); // Add more columns as needed

        // Add book data to the worksheet
        books.forEach((book) => {
            worksheet.addRow([book.title, book.author, book.ISBN]); // Add more columns as needed
        });

        // Set response headers for Excel download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=books.xlsx');

        // Stream the workbook to the response
        await workbook.xlsx.write(res);

        // End the response
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};