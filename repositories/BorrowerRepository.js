const db = require("../database/models/index");
const logger = require("../services/logger");

module.exports.insert = async (data) => {
    try {
        return await db.Borrower.create(data);
    } catch (err) {
        logger.error("Database Insertion failed err: ", err);
        return false;
    }
};

module.exports.findBy = async (where, attributes = null) => {
    try {
        const dataRetrieved = await db.Borrower.findOne({
            where: where,
            attributes: attributes,
        });
        return dataRetrieved ?? false;
    } catch (err) {
        logger.error("Database Selection failed err: ", err);
        return false;
    }
};

 module.exports.update = async (Borrower, updatedData) => {
   try {
     return await Borrower.update(updatedData)
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};

module.exports.destroy = async (item_id) => {
   try {
      return await db.Borrower.destroy({
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

module.exports.findAll = async () => {
   try {
      return await db.Borrower.findAll();
   } catch (err) {
      logger.error("Database selection failed err: ", err);
      return false;
   }
};