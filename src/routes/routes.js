const usersRoutes = require('./user-routes')
const unitsRoutes = require('./unit-routes')
const enviromentTypesRoutes = require('./enviroment-types-routes')
const enviromentsRoutes = require('./enviroment-routes')
const questionsRoutes = require('./question-routes')
const auditRoutes = require('./audit-routes')
const evaluationRoutes = require('./evaluation-routes')
const emailRoutes = require('./email-routes')

let routes = {
  usersRoutes: usersRoutes,
  unitsRoutes: unitsRoutes,
  enviromentTypesRoutes: enviromentTypesRoutes,
  enviromentsRoutes: enviromentsRoutes,
  questionsRoutes: questionsRoutes,
  auditRoutes: auditRoutes,
  evaluationRoutes: evaluationRoutes,
  emailRoutes: emailRoutes
}

module.exports = routes