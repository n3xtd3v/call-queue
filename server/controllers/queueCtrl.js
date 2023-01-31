const mssql = require('mssql')

const queueCtrl = {
  getQueue: async (req, res) => {
    try {
      // const queues = await mssql.query`
      // SELECT
      // FROM
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = queueCtrl
