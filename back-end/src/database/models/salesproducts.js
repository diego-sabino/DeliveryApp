module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreingKey: true,
      field: 'sale_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreingKey: true,
      field: 'product_id',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    field: { underscored: true },
    tableName: 'sales_products',
  });
  SalesProduct.associate = (models) => {
    models.products.belongsToMany(models.sale, {
      through: SalesProduct,
      as: 'sale',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    models.sale.belongsToMany(models.products, {
      through: SalesProduct,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  }; 
  return SalesProduct;
};
