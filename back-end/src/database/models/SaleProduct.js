module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct',
      {
        quantity: DataTypes.INTEGER,
      }, 
      {
        tableName: 'salesProducts',
        timestamps: false, 
        underscored: true,
      });
  
      SaleProduct.associate = (models) => { 
      models.Product.belongsToMany(models.Sale, { 
        as: 'sales', 
        through: SaleProduct, 
        foreignKey: 'saleId', 
        otherKey: 'productId', 
      });
  
  
      models.Sale.belongsToMany(models.Product, {
        as: 'products',
        through: SaleProduct, 
        foreignKey: 'productId',
        otherKey: 'saleId', 
      });
    };
    return SaleProduct;
  };