"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoreItemProperties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.StoreItem);
    }
  }
  StoreItemProperties.init(
    {
      sizes: DataTypes.STRING,
      paragraphDescription: DataTypes.TEXT,
      listDescription: DataTypes.TEXT,
      variants: DataTypes.STRING,
      storeItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: "StoreItems",
          },
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "StoreItemProperties",
    },
  );
  return StoreItemProperties;
};
