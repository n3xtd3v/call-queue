const mssql = require("mssql");

const queueCtrl = {
  getQueues: async (req, res) => {
    try {
      const { id } = req.params;

      const cashierId = id.slice(0, 36);
      const pharmacyId = id.slice(37, 73);

      const queues = await mssql.query`
      SELECT qe.call_queue_id, qe.queue_number, qe.call_display_info, qe.current_call_queue_event_rcd, cq.name_e, call_queue_type_rcd
      ,CASE WHEN ps.primary_language_rcd = 'TH' THEN 'TH' ELSE 'EN' END lang
      ,CASE WHEN ps.nationality_rcd = 'THA' THEN 'TH' ELSE 'EN' END nationality
      
      FROM  call_queue_entry_nl_view as qe
      INNER JOIN call_queue_nl_view as cq on cq.call_queue_id = qe.call_queue_id
      INNER JOIN patient_visit_nl_view as pv on pv.patient_visit_id = qe.patient_visit_id
      INNER JOIN person_nl_view as ps on ps.person_id = pv.patient_id
      
      WHERE  qe.current_call_queue_event_rcd 
      IN('WAITING', 'READY', 'CALL', 'SERVING', 'MISSEDCALL') 
      AND cq.call_queue_id 
      IN (${cashierId}, ${pharmacyId}) 
      AND cast(qe.lu_updated as date) = cast(getdate() as date)
      `;

      return res.status(200).json({
        queues: queues.recordsets[0],
        queuesLegth: queues.recordsets[0].length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = queueCtrl;
