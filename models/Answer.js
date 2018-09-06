module.exports = (sequelize, DataTypes) => {  
    
    var Answer = sequelize.define('Answer', {
        id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        questions_id: {
            type: DataTypes.INTEGER
        },

        audits_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        classMethods: {
            associate : function(models) { },
        },

        tableName: 'answers',
        timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */
        
    });

    Answer.associate = (models) => {
        Answer.belongsTo(models.Audit, { foreignKey: 'audits_id'});
        Answer.belongsTo(models.Question, { foreignKey: 'questions_id'});
    };
    

    return Answer;
};
