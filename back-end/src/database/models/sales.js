module.exports = (sequelize, DataTypes) => {
    const sales = sequelize.define('sales', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: DataTypes.INTEGER,
         foreignKey: true
        },
      sellerId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      totalPrice: { type: DataTypes.DECIMAL(9,2) },
      deliveryAddress: { type: DataTypes.STRING },
      deliveryNumber: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      saleDate: { type: DataTypes.DATE }
    },
    {
      tableName: 'sales', 
      underscored: true,

    });
  
    sales.associate = (models) => {
      sales.belongsTo(models.users,
        { foreignKey: 'userId', as: 'users' },
        { foreignKey: 'sellerId', as: 'sellers' },
        );
    };

    return sales;
  };