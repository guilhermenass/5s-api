module.exports = (sequelize, DataTypes) => {  
    const Evaluation = sequelize.define('Evaluation', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        enviroments_id: {
            type: DataTypes.INTEGER
        },

        audits_id: {
            type: DataTypes.INTEGER
        },

        users_id: {
            type: DataTypes.INTEGER
        },

        date: {
            type: DataTypes.DATEONLY
        },

        status: {
            type: DataTypes.INTEGER
        },


    },  
    {
        classMethods: {
            associate : function(models) {
            },
        },
        tableName: 'evaluations',
        timestamps: false
    });

    Evaluation.associate = (models) => {
        Evaluation.belongsTo(models.Audit, { foreignKey: 'audits_id'});
        Evaluation.belongsTo(models.Enviroment, { foreignKey: 'enviroments_id'});
        Evaluation.belongsTo(models.User, { foreignKey: 'users_id'});
    };

    return Evaluation;
  };