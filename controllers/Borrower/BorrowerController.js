const BorrowerRepository = require("../../repositories/BorrowerRepository");
const Validator = require('validatorjs');
const createBorrowerRules = require("./createBorrowerRules");
const updateBorrowerRules = require("./updateBorrowerRules");

module.exports.index = async (req, res) => {
    return res.status(200).json({data: await BorrowerRepository.findAll()});
};

module.exports.show = async (req, res) => {
    return res.status(200).json({data: await BorrowerRepository.findBy({id: req.params.id})});
};

module.exports.store = async (req, res) => {
    const validation = new Validator(req.body, createBorrowerRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    const data =  await BorrowerRepository.insert(req.body);
    return res.status(201).json({message: "Borrower created Successfully", data: data});
};

module.exports.update = async (req, res) => {
    const validation = new Validator(req.body, updateBorrowerRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    const data =  await BorrowerRepository.update(
        await BorrowerRepository.findBy({id: req.params.id}),
        req.body
    );
    return res.status(201).json({message: "Borrower updated Successfully", data: data});
};

module.exports.destroy = async (req, res) => {
    await BorrowerRepository.destroy(req.params.id);
    return res.status(204).json({message: "Borrower deleted Successfully"});
};