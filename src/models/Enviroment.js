module.exports = (sequelize, DataTypes) => {
	const Enviroment = sequelize.define('Enviroment', {

		/**
		 * Identificador do ambiente
		 */
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},

		/**
		 * Nome da auditoria
		 */
		name: {
			type: DataTypes.STRING
		},

		/**
		 * Identificador da unidade que o ambiente pertence
		 */
		units_id: {
			type: DataTypes.INTEGER
		},

		/**
		 * Identificador do responsável do ambiente
		 */
		users_id: {
			type: DataTypes.INTEGER
		},

		/**
		 * Identificador do tipo de ambiente
		 */
		enviroment_types_id: {
			type: DataTypes.INTEGER
		},

		/**
		 * Descrição do ambiente
		 */
		description: {
			type: DataTypes.STRING
		},

		/**
		 * Bloco que o ambiente pertence (ex: Bloco C)
		 */
		block: {
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
		tableName: 'enviroments',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})

	Enviroment.associate = (models) => {
		Enviroment.belongsTo(models.User, { foreignKey: 'users_id' })
		Enviroment.belongsTo(models.Unit, { foreignKey: 'units_id' })
		Enviroment.belongsTo(models.EnviromentType, { foreignKey: 'enviroment_types_id' })
	}

	return Enviroment
}