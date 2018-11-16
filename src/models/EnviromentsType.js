module.exports = (sequelize, DataTypes) => {  
    
	var EnviromentType = sequelize.define('EnviromentType', {

		/**
		 * Identificador do tipo de ambiente
		 */
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},

		/**
		 * Nome do tipo de ambiente
		 */
		name: {
			type: DataTypes.STRING
		},

		/**
		 * Descrição do tipo de ambiente
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
		tableName: 'enviroment_types',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})


	return EnviromentType
}