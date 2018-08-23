module.exports = (sequelize, DataTypes) => {  
    const Unit = sequelize.define('Unit', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },		
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
    },  
    {
      classMethods: {
        associate: function (models) {
        
        },
      },
      tableName: 'units',
      timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
    });
    
    return Unit;
  };