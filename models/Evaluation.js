module.exports = (sequelize, DataTypes) => {  
    const Evaluation = sequelize.define('Evaluation', {
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
        }		
    },  
    {
        classMethods: {
            associate : function(models) {
            },
        },
        tableName: 'evaluations' 
    });

    Evaluation.associate = (models) => {
        Evaluation.belongsTo(models.User, { foreignKey: 'users_id'});
        Evaluation.belongsTo(models.Enviroment, { foreignKey: 'enviroments_id'});
    };

    return Evaluation;
  };