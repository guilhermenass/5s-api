const Sequelize = require('sequelize')
const settings = require('../../config/config')
var fs = require('fs')
var path = require('path')

const sequelize = new Sequelize(
	settings[process.env.NODE_ENV].database,
	settings[process.env.NODE_ENV].username,
	settings[process.env.NODE_ENV].password, {	
		host: settings[process.env.NODE_ENV].host,
		port: settings[process.env.NODE_ENV].port,
		dialect: settings[process.env.NODE_ENV].dialect,
		dialectOptions: {
			ssl: false
		},
		logging: true
	}
)

 var db = {}
 fs.readdirSync(__dirname).filter(function(file) {
 	return (file.indexOf('.') !== 0) && (file !== 'index.js')
 })
 	.forEach(function(file) {
 		var model = sequelize.import(path.join(__dirname, file))
 		db[model.name] = model
 	})
 Object.keys(db).forEach(function(modelName) {
 	if ('associate' in db[modelName]) {
 		db[modelName].associate(db)
 	}
 })
 db.sequelize = sequelize
 db.Sequelize = Sequelize
 db.sequelize.sync()
 module.exports = db
