module.exports = (sequelize, DataTypes) => {  
    
    var Question = sequelize.define('Question', {
        id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },

        description: {
            type: DataTypes.STRING
        }
    },
    {
        classMethods: {
            associate : function(models) { },
        },

        tableName: 'questions' 
        
    });
    

    return Question;
};
