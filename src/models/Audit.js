module.exports = (sequelize, DataTypes) => {

	const Audit = sequelize.define('Audit', {

		/**
		 * Identificador da auditoria
		*/
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},

		/**
		 * Título da auditoria
		 */
		title: {
			type: DataTypes.STRING
		},

		/**
		 * 0 = Em andamento
		 * 1 = Concluída
		*/
		status: {
			type: DataTypes.STRING
		},

		/**
		 * Data inicial da auditoria
		 */
		initial_date: {
			type: DataTypes.DATEONLY
		},


		/**
		 * Data final da auditoria
		 */
		due_date: {
			type: DataTypes.DATEONLY
		},

		/**
		 * Descrição da auditoria
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
		tableName: 'audits',
		timestamps: false
	})

	Audit.associate = function (models) {
		Audit.hasMany(models.Evaluation, {foreignKey: 'audits_id'})
	}

	return Audit
}