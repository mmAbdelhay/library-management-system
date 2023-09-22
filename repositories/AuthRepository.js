const db = require("../database/models/index");
const hash = require("../services/hash");
const logger = require("../services/logger");

module.exports.insertBorrower = async (payload) => {
    try {
        const borrower = await db.Borrower.create({
            name: payload.name,
            email: payload.email,
            password: await hash.hashPassword(payload.password),
        });
        return {email: borrower.email, name: borrower.name};
    } catch (err) {
        logger.error("Database Insertion failed err: ", err);
        return false;
    }
};

module.exports.findByEmail = async (borrower) => {
    try {
        const borrowerRetrieved = await db.Borrower.findOne({
            where: {
                email: borrower.email,
            },
        });
        return borrowerRetrieved ?? false;
    } catch (err) {
        logger.error("Database Selection failed err: ", err);
        return false;
    }
};

module.exports.findByID = async (borrower) => {
    try {
        const borrowerRetrieved = await db.borrower.findOne({
            where: {
                id: borrower._id,
            },
            attributes: ["id", "name", "email"],
        });
        return borrowerRetrieved ?? false;
    } catch (err) {
        logger.error("Database Selection failed err: ", err);
        return false;
    }
};
