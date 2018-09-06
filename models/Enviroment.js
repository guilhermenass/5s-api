module.exports = (sequelize, DataTypes) => {  
    const Enviroment = sequelize.define('Enviroment', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        units_id: {
            type: DataTypes.INTEGER
        },
        users_id: {
            type: DataTypes.INTEGER
        },
        enviroment_types_id: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        block: {
            type: DataTypes.STRING
        }		
    },  
    {
        classMethods: {
            associate : function(models) {
            },
        },
        tableName: 'enviroments',
        timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
    });

    Enviroment.associate = (models) => {
        Enviroment.belongsTo(models.User, { foreignKey: 'users_id'});
        Enviroment.belongsTo(models.Unit, { foreignKey: 'units_id'});
        Enviroment.belongsTo(models.EnviromentType, { foreignKey: 'enviroment_types_id'});
    };

    return Enviroment;
  };