"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoreItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.hasOne(models.StoreItemProperties, {
        as: "properties",
      });
    }
  }
  StoreItem.init(
    {
      name: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      vendor: {
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "Users",
          },
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "StoreItem",
    },
  );
  return StoreItem;
};
