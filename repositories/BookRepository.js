const db = require("../database/models/index");
const logger = require("../services/logger");

module.exports.insert = async (data) => {
    try {
        return await db.Book.create(data);
    } catch (err) {
        logger.error("Database Insertion failed err: ", err);
        return false;
    }
};

module.exports.findBy = async (where, attributes = null) => {
    try {
        const dataRetrieved = await db.Book.findOne({
            where: where,
            attributes: attributes,
        });
        return dataRetrieved ?? false;
    } catch (err) {
        logger.error("Database Selection failed err: ", err);
        return false;
    }
};

 module.exports.update = async (Book, updatedData) => {
   try {
     return await Book.update(updatedData)
   } catch (err) {
      logger.error("Database update client info failed err: ", err);
      return false;
   }
};

module.exports.destroy = async (item_id) => {
   try {
      return await db.Book.destroy({
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
      return await db.Book.findAll();
   } catch (err) {
      logger.error("Database selection failed err: ", err);
      return false;
   }
};