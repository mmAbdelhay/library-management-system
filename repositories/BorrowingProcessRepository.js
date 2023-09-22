const db = require("../database/models/index");
const logger = require("../services/logger");
const {Op} = require('sequelize');

module.exports.insert = async (data) => {
    try {
        return await db.BorrowingProcess.create(data);
    } catch (err) {
        logger.error("Database Insertion failed err: ", err);
        return false;
    }
};

module.exports.destroy = async (item_id) => {
    try {
        return await db.BorrowingProcess.destroy({
            where: {
                id: item_id,
            },
            individualHooks: true,
        });
    } catch (err) {
        logger.error("Database item Destruction failed err: ", err);
        return false;
    }
};

module.exports.findBy = async (where, attributes = null) => {
    try {
        const dataRetrieved = await db.BorrowingProcess.findOne({
            where: where,
            attributes: attributes,
        });
        return dataRetrieved ?? false;
    } catch (err) {
        logger.error("Database Selection failed err: ", err);
        return false;
    }
};

module.exports.findAll = async () => {
    try {
        return await db.BorrowingProcess.findAll({
            include: [
                {model: db.Book},
                {model: db.Borrower}
            ]
        });
    } catch (err) {
        logger.error("Database selection failed err: ", err);
        return false;
    }
};

module.exports.findAllOverDue = async () => {
    try {
        return await db.BorrowingProcess.findAll({
            where: {
                returnDate: {
                    [Op.lt]: new Date(),
                },
            },
            include: [
                {model: db.Book},
                {model: db.Borrower}
            ]
        });
    } catch (err) {
        logger.error("Database selection failed err: ", err);
        return false;
    }
};