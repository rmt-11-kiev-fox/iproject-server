const TeamController = require('../controllers/teamController')

const teamRouter = require('express').Router()
teamRouter.get('/', TeamController.getAllTeamsByLeague)
teamRouter.get('/:teamKey', TeamController.getTeamByTeamKey)

module.exports = teamRouter