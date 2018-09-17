module.exports = (sequelize, DataTypes) => {  
    const Evaluation = sequelize.define('Evaluation', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        /**
         * Ambiente que será avaliado
         */
        enviroments_id: {
            type: DataTypes.INTEGER
        },

        /** 
         * Id da auditoria da avaliação criada
         */
        audits_id: {
            type: DataTypes.INTEGER
        },

        /** 
         * Id correspondente ao usuario que irá executar a avaliação
         */
        users_id: {
            type: DataTypes.INTEGER
        },

        /** (Campo referente a data de finalização da avaliação)
         *  Será preenchida com valor nulo na criação pelo webapp.
         *  Quando for finalizada, o valor desse campo será a data que a avaliação foi finalizada. */
        date: {
            type: DataTypes.DATEONLY,
        },

        /** Status da avaliação
         * 0 = pendente
         * 1 = concluida
         */
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