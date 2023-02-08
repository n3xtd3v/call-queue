import React from 'react'

const Footer = ({ queues }) => {
  const queuesFilterMissedCall = queues?.filter(
    (queue) => queue.current_call_queue_event_rcd === 'MISSEDCALL'
  )

  const textString = queuesFilterMissedCall?.map(
    (queueFilterMissedCall) => queueFilterMissedCall['queue_number']
  )

  const test = textString?.join(', ')

  return (
    <div className="main-color fixed w-full bottom-0 left-0 z-50">
      <p className="text-3xl text-white scrolling py-7">
        {test && (
          <span>QN ที่เรียกแล้ว โปรดติดต่อเคาน์เตอร์ {test?.toString()}</span>
        )}
      </p>
    </div>
  )
}

export default Footer
