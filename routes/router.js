const router = require('express').Router()
const Controller = require('../controller/controller')



router.get('/', Controller.home)
router.get('/join', Controller.register)
router.post('/join', Controller.registered)
router.get('/login', Controller.login)
router.post('/login', Controller.loggedIn)
router.get('/login/admin', Controller.loginAdmin)
router.post('/login/admin', Controller.loggedAdmin)
router.get('/logout', Controller.logout);
router.get('/admin/page', Controller.adminPage)
router.get('/admin/page/addPlan', Controller.addPlan)
router.post('/admin/page/addPlan', Controller.addedPlan)
router.get('/arts/:id/delete', Controller.deletePlan)


module.exports = router