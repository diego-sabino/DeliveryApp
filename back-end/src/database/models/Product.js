module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
        },
      name: DataTypes.STRING,  
      price: DataTypes.DECIMAL(4,2),
      urlImage: DataTypes.STRING,
    },
    {
      tableName: 'products',
      timestamps: false, 
      underscored: true,
    });
  
    Product.associate = (models) => {
      Product.hasMany(models.Sale, 
         { foreignKey: 'userId', as: 'sales' }); 
        };
    return Product;
  };