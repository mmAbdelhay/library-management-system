const BorrowingProcessRepository = require("../../repositories/BorrowingProcessRepository");
const BookRepository = require("../../repositories/BookRepository");
const Validator = require('validatorjs');
const createBorrowingProcessRules = require("./createBorrowingProcessRules");


module.exports.index = async (req, res) => {
    return res.status(200).json({data: await BorrowingProcessRepository.findAll()});
};

module.exports.checkout = async (req, res) => {
    const validation = new Validator(req.body, createBorrowingProcessRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    const book = await BookRepository.findBy({id: validation.input.bookId});
    if (!book) return res.status(402).json({message: "book does not exist"});

    const data = await BorrowingProcessRepository.insert({
        bookId: validation.input.bookId,
        borrowerId: req.authUser._id
    });
    if (!data) return res.status(500).json({message: "Cannot make a checkout"});

    return res.status(201).json({message: "Borrowing process created Successfully", data: data});
};

module.exports.return = async (req, res) => {
    const borrowingProcess = await BorrowingProcessRepository.findBy({
        id: +req.params.id,
        borrowerId: req.authUser._id
    });
    if (!borrowingProcess) return res.status(404).json({message: "Borrowing process not found"});

    await BorrowingProcessRepository.destroy(req.params.id);
    return res.status(204).json({message: "Borrower deleted Successfully"});
};