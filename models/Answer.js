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

        evaluations_id: {
            type: DataTypes.INTEGER
        },

        status: {
            type: DataTypes.INTEGER
        },
        
        comments: {
            type: DataTypes.STRING
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
        Answer.belongsTo(models.Evaluation, { foreignKey: 'evaluations_id'});
        Answer.belongsTo(models.Question, { foreignKey: 'questions_id'});
    };
    

    return Answer;
};
