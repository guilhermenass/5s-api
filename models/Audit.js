module.exports = (sequelize, DataTypes) => {  
    const Audit = sequelize.define('Audit', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        users_id: {
            type: DataTypes.INTEGER
        },

        enviroments_id: {
            type: DataTypes.INTEGER
        },

        createDate: {
            type: DataTypes.DATEONLY
        },

        dueDate: {
            type: DataTypes.DATEONLY
        },

        title: {
            type: DataTypes.STRING
        },

        status: {
            type: DataTypes.STRING
        },

        description: {
            type: DataTypes.STRING
        },

        current_responsible: {
            type: DataTypes.INTEGER
        }
    },  
    {
        classMethods: {
            associate : function(models) {
            },
        },
        tableName: 'audits',
        timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
    });

    Audit.associate = (models) => {
        Audit.belongsTo(models.User, { foreignKey: 'users_id'});
        Audit.belongsTo(models.Enviroment, { foreignKey: 'enviroments_id'});
    };

    return Audit;
  };