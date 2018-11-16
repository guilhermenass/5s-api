module.exports = (sequelize, DataTypes) => {  
	const User = sequelize.define('User', {

		/**
		 * Identificador do usuário
		 */
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},		

		/**
		 * Nome do usuário
		 */
		name: {
			type: DataTypes.STRING
		},

		/**
		 * E-mail do usuário
		 */
		email: {
			type: DataTypes.STRING
		},

		/**
		 * Senha do usuário
		 */
		password: {
			type: DataTypes.STRING
		},

		/**
		 * (Perfil do usuário)
		 * ADMIN = 1,
		 * APPRAISER = 2,
		 * ADMIN_APPRAISER = 3,
		 * RESPONSIBLE = 4,
		 * ADMIN_RESPONSIBLE = 5,
		 * RESPONSIBLE_APPRAISER = 6,
		 * GENERIC = 7
		 */
		profile: {
			type: DataTypes.INTEGER
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
		tableName: 'users',
		timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
	})
    
	return User
}