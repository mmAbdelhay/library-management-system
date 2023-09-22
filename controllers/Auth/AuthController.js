const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authRepository = require("../../repositories/AuthRepository");
const hashComparer = require("../../services/hash");
const token = require("../../services/token");
const Validator = require('validatorjs');
const {loginValidationRules, registerValidationRules} = require("./Rules");

module.exports.login = async (req, res) => {
    const validation = new Validator(req.body, loginValidationRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    const borrower = await authRepository.findByEmail(req.body);
    if (!borrower) return res.status(403).json({message: "Email or password is incorrect"});

    if (!await hashComparer.hashCompare(req.body.password, borrower.password))
        return res.status(403).json({message: "Email or password is incorrect"});

    return res.status(200).json({
        message: "borrower logged in successfully",
        token: token.generateToken(borrower.id, "borrower"),
    });
};

module.exports.register = async (req, res) => {
    const validation = new Validator(req.body, registerValidationRules);
    if (validation.fails()) return res.status(402).json(validation.errors.all());

    const borrower = await authRepository.findByEmail(req.body);
    if (borrower) return res.status(403).json({message: "Email registered before"});

    const newBorrower = await authRepository.insertBorrower(req.body);
    return res.status(201).json({message: "Registered Successfully", borrower: newBorrower});
};
