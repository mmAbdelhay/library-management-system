'use strict';
const {Model, Sequelize} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Borrower extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Borrower.init({
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: DataTypes.STRING,
        registeredDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        sequelize,
        modelName: 'Borrower',
    });

    return Borrower;
};