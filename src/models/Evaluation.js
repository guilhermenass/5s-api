module.exports = (sequelize, DataTypes) => {  
	const Evaluation = sequelize.define('Evaluation', {
		/**
         * Chave primária da avaliação
         */
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
        * 0 Pendente com Avaliador
		* 1 Pendente com Responsavel do ambiente
		* 2 Concluida
		* 3 Reavaliação
        */
		status: {
			type: DataTypes.INTEGER
		},

		/**
         * Id do responsável atual pela avaliação (avaliador ou responsável)
         */
		current_responsible: {
			type: DataTypes.INTEGER
		},

		/**
		 * Verifica se o registro está ativo (técnica de exclusão lógica)
		 */
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},

		/**
		 * Nota da avaliação
		 */
		grade: {
			type: DataTypes.INTEGER
		}
	},  
	{
		tableName: 'evaluations',
		timestamps: false
	})

	Evaluation.associate = function (models) {
		Evaluation.belongsTo(models.Audit, {foreignKey: 'audits_id'})
		Evaluation.belongsTo(models.Enviroment, { foreignKey: 'enviroments_id'})
		Evaluation.belongsTo(models.User, { foreignKey: 'users_id'})
	}

	return Evaluation
}