module.exports = (sequelize, DataTypes) => {
    const salesProducts = sequelize.define('salesProducts',
      {
        quantity: DataTypes.INTEGER,
      }, 
      {
        tableName: 'salesProducts',
        timestamps: false, 
        underscored: true,
      });
  
    salesProducts.associate = (models) => { 
      models.products.belongsToMany(models.sales, { 
        as: 'sales', 
        through: salesProducts, 
        foreignKey: 'saleId', 
        otherKey: 'productId', 
      });
  
  
      models.sales.belongsToMany(models.products, {
        as: 'products',
        through: salesProducts, 
        foreignKey: 'saleId',
        otherKey: 'productId', 
      });
    };
    return salesProducts;
  };