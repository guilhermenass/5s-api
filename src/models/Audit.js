module.exports = (sequelize, DataTypes) => {

	const Audit = sequelize.define('Audit', {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},

		title: {
			type: DataTypes.STRING
		},

		status: {
			type: DataTypes.STRING
		},

		initial_date: {
			type: DataTypes.DATEONLY
		},

		due_date: {
			type: DataTypes.DATEONLY
		},

		description: {
			type: DataTypes.STRING
		},
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