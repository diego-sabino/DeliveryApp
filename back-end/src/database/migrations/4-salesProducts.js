module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("salesProducts", {
            saleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "sales",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                field: 'sale_id'
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "products",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                foreignKey: true,
                field: 'product_id',
            },
            quatity: {
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("salesProducts");
      },
};