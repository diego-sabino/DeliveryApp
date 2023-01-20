// models/products.js
module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
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
  
    products.associate = (models) => { 
      products.hasMany(models.sales, 
         { foreignKey: 'user_id', as: 'sales_user' }); 
        };
    return products;
  };