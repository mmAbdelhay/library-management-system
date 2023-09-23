const BookRepository = require("../../repositories/BookRepository");
const Validator = require('validatorjs');
const createBookRules = require("./createBookRules");
const updateBookRules = require("./updateBookRules");

module.exports.index = async (req, res) => {
    return res.status(200).json({data: await BookRepository.findAll()});
};

module.exports.search = async (req, res) => {
    return res.status(200).json({data: await BookRepository.searchBooks(req.query.searchQuery)});
};

module.exports.show = async (req, res) => {
    return res.status(200).json({data: await BookRepository.findBy({id: req.params.id})});
};

module.exports.store = async (req, res) => {
    const validation = new Validator(req.body, createBookRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    const data = await BookRepository.insert(validation.input);
    if (!data) return res.status(500).json({message: "Cannot insert Book"})
    return res.status(201).json({message: "Book created Successfully", data: data});
};

module.exports.update = async (req, res) => {
    const validation = new Validator(req.body, updateBookRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    if (!req.params.id) res.status(404).json({message: "Not found"});

    const data = await BookRepository.update(
        await BookRepository.findBy({id: req.params.id}),
        validation.input
    );
    return res.status(201).json({message: "Book updated Successfully", data: data});
};

module.exports.destroy = async (req, res) => {
    if (!req.params.id) res.status(404).json({message: "Not found"});

    await BookRepository.destroy(req.params.id);
    return res.status(200).json({message: "Book deleted Successfully"});
};