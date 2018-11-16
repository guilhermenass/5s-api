/**
 * Tabela associativa
 */
module.exports = (sequelize, DataTypes) => {
	var EnviromentTypeQuestion = sequelize.define('EnviromentTypeQuestion', {

		/**
		 * Tipo de ambiente relacionado
		 */
		enviroment_types_id: {
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		/**
		 * Questão relacionada
		 */
		questions_id: {
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'enviroment_types_has_questions',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})

	EnviromentTypeQuestion.associate = (models) => {
		EnviromentTypeQuestion.belongsTo(models.EnviromentType, {
			foreignKey: {
				name: 'enviroment_types_id',
				allowNull: false
			}
		})

		EnviromentTypeQuestion.belongsTo(models.Question, {
			foreignKey: {
				name: 'questions_id',
				allowNull: false
			}
		})
	}

	return EnviromentTypeQuestion
}