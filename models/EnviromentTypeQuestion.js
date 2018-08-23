module.exports = (sequelize, DataTypes) => {
    var EnviromentTypeQuestion = sequelize.define('EnviromentTypeQuestion', {
      enviroment_types_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      questions_id: {
        primaryKey: true,
        type: DataTypes.INTEGER
      }

    }, {
      classMethods: {
        associate: function(models) {
      }
    },
    
    tableName: 'enviroment_types_has_questions',
    timestamps: false, /* false para não criar colunas createdAt e updateAt no banco */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    });

    EnviromentTypeQuestion.associate = (models) => {
      EnviromentTypeQuestion.belongsTo(models.EnviromentType, {
        foreignKey: {
          name: 'enviroment_types_id',
          allowNull: false
        }
      });

      EnviromentTypeQuestion.belongsTo(models.Question, {
        foreignKey: {
          name: 'questions_id',
          allowNull: false
        }
      });
    }

    return EnviromentTypeQuestion;
  };