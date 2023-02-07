const router = require('express').Router()
const floorCtrl = require('../controllers/floorCtrl')

router.get('/floors/cashier', floorCtrl.getFloorsCashier)

router.get('/floors/pharmacy', floorCtrl.getFloorsPharmacy)

router.post('/floorId', floorCtrl.getFloorId)

module.exports = router
