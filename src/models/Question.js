module.exports = (sequelize, DataTypes) => {  
    
	var Question = sequelize.define('Question', {

		/**
		 * Identificador da pergunta
		 */
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},

		/**
		 * Título da pergunta
		 */
		title: {
			type: DataTypes.STRING
		},

		/**
		 * Senso em que a pergunta se adequa
		 */
		sense: {
			type: DataTypes.INTEGER
		},

		/**
		 * Descrição da pergunta
		 */
		description: {
			type: DataTypes.STRING
		},

		/**
		 * Verifica se o registro está ativo (técnica de exclusão lógica)
		 */
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'questions',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})
	return Question
}
