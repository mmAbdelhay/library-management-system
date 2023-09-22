'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BorrowingProcess extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            BorrowingProcess.belongsTo(models.Book, {
                foreignKey: 'bookId',
            });
            BorrowingProcess.belongsTo(models.Borrower, {
                foreignKey: 'borrowerId',
            });
        }
    }

    BorrowingProcess.init({
        borrowerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: () => {
                const returnDate = new Date();
                returnDate.setMonth(returnDate.getMonth() + 1);
                return returnDate;
            },
        },
    }, {
        sequelize,
        modelName: 'BorrowingProcess',
    });
    return BorrowingProcess;
};