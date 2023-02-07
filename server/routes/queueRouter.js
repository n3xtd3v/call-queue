const router = require('express').Router()
const queueCtrl = require('../controllers/queueCtrl')

router.get('/queues/:id', queueCtrl.getQueues)

module.exports = router
