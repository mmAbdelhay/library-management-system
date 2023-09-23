const BorrowerRepository = require("../../repositories/BorrowerRepository");
const BorrowingProcessRepository = require("../../repositories/BorrowingProcessRepository");
const Validator = require('validatorjs');
const createBorrowerRules = require("./createBorrowerRules");
const updateBorrowerRules = require("./updateBorrowerRules");

module.exports.index = async (req, res) => {
    return res.status(200).json({data: await BorrowerRepository.findAll()});
};

module.exports.update = async (req, res) => {
    const validation = new Validator(req.body, updateBorrowerRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    if (+req.params.id !== req.authUser._id) return res.status(403).json({message: "Not authorized to update"})

    const data = await BorrowerRepository.update(
        await BorrowerRepository.findBy({id: req.params.id}),
        validation.input
    );

    return res.status(201).json({message: "Borrower updated Successfully", data: data});
};

module.exports.destroy = async (req, res) => {
    if (+req.params.id !== req.authUser._id) return res.status(403).json({message: "Not authorized to delete"})

    await BorrowerRepository.destroy(req.params.id);
    return res.status(200).json({message: "Borrower deleted Successfully"});
};

module.exports.getAllBorrowedBooks = async (req, res) => {
    return res.status(200).json({data: await BorrowingProcessRepository.findAll({borrowerId: req.authUser._id})});
};