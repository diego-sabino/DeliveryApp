


const urlDefault = 'https://bityli.com/XDCXy'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL(4,2),
            },
            urlImage: {
                type: Sequelize.STRING,
                field: 'url_image',
                default: urlDefault
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("products");
    },
};