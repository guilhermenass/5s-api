module.exports = (sequelize, DataTypes) => {  
	const Unit = sequelize.define('Unit', {

		/**
		 * Identificador da unidade
		 */
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},		

		/**
		 * Nome da unidade
		 */
		name: {
			type: DataTypes.STRING
		},

		/**
		 * Descrição da unidade
		 */
		description: {
			type: DataTypes.STRING
		},

		/** 
		 * Cidade da unidade
		 */
		city: {
			type: DataTypes.STRING
		},

		/**
		 * Sigla do estado da unidade (ex: SC)
		 */
		state: {
			type: DataTypes.CHAR(2),
			length: 2
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
		tableName: 'units',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})
    
	return Unit
}