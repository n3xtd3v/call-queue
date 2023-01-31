const router = require('express').Router()
const queueCtrl = require('../controllers/queueCtrl')

router.get('/queues', queueCtrl.getQueue)

module.exports = router
