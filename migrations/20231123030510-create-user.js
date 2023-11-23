"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authStrategy: {
        type: Sequelize.ENUM(["local", "google"]),
        default: "local",
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        default: null,
      },
      lastName: {
        type: Sequelize.STRING,
        default: null,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      phoneDialCode: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      hash: {
        type: Sequelize.STRING,
        default: null,
      },
      role: {
        type: Sequelize.ENUM(["admin", "user", "vendor"]),
        default: "user",
        allowNull: false,
      },
      verifiedAt: {
        type: Sequelize.DATE,
        default: null,
      },
      vendorName: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
