  module.exports = (sequelize, DataTypes) => {  
    const User = sequelize.define('User', {
		id: {
			primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },		
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        profile: {
            type: DataTypes.INTEGER
        },
    },  
    {
        tableName: 'users' 
    });
    
    return User;
  };