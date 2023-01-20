module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true
         },
      userId: {
        type: DataTypes.INTEGER,
         foreignKey: true
        },
      sellerId: {
        type: DataTypes.INTEGER,
        foreignKey: true
        },
      totalPrice: { 
        type: DataTypes.DECIMAL(9,2)
        },
      deliveryAddress: { 
        type: DataTypes.STRING
        },
      deliveryNumber: {
         type: DataTypes.STRING 
        },
      status: { 
        type: DataTypes.STRING 
        },
      saleDate: { 
        type: DataTypes.DATE }
    },
    {
      tableName: 'sales', 
      underscored: true,

    });
  
    Sale.associate = (models) => {
      Sale.belongsTo(models.User,
        { foreignKey: 'userId', as: 'users' },
        { foreignKey: 'sellerId', as: 'sellers' },
        );
    };

    return Sale;
  };