"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      phoneDialCode: DataTypes.STRING,
      role: DataTypes.ENUM(["admin", "user", "vendor"]),
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.vendorName
            ? this.vendorName
            : `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
      authStrategy: DataTypes.ENUM(["local", "google"]),
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      hash: DataTypes.STRING,
      verifiedAt: DataTypes.DATE,
      vendorName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
