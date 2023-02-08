const mssql = require('mssql')

const floorCtrl = {
  getFloorsCashier: async (req, res) => {
    try {
      const floors = await mssql.query`
        SELECT call_queue_id, name_e, call_queue_type_rcd
        FROM call_queue_nl_view
        WHERE call_queue_type_rcd 
        IN ('Cashier') 
        AND name_e NOT LIKE 'MC1%'
        ORDER BY name_e ASC;
        `

      return res.status(200).json({ floors: floors.recordset })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getFloorsPharmacy: async (req, res) => {
    try {
      const floors = await mssql.query`
        SELECT call_queue_id, name_e, call_queue_type_rcd
        FROM call_queue_nl_view
        WHERE call_queue_type_rcd 
        IN ('PHARMACY') 
        AND name_e NOT LIKE 'MC1%'
        ORDER BY name_e ASC;
        `

      return res.status(200).json({ floors: floors.recordset })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getFloorId: async (req, res) => {
    try {
      const { name } = req.body

      const floorId = await mssql.query`
        SELECT call_queue_id
        FROM call_queue_nl_view
        WHERE name_e = ${name}
          `

      return res.status(200).json({ floorId: floorId.recordset[0] })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = floorCtrl
