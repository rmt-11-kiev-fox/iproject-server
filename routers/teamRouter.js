const TeamController = require('../controllers/teamController')

const teamRouter = require('express').Router()
teamRouter.get('/', TeamController.getAllTeamsByLeague)
// teamRouter.get('/', (req, res, next) => {
//     console.log('masuuk ke router tim', req.body);
// })
teamRouter.get('/:teamKey', TeamController.getTeamByTeamKey)

module.exports = teamRouter