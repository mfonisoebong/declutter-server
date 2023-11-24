"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StoreItemProperties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sizes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paragraphDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      listDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      variants: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      storeItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: {
            tableName: "StoreItems",
          },
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("StoreItemProperties");
  },
};
