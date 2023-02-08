import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/floor.css'
import Nav from '../components/nav'
import Footer from '../components/footer'

export default function Floor() {
  const [queues, setQueues] = useState(null)
  const utterThis = new SpeechSynthesisUtterance()

  const { floorId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:7070/api/queues/${floorId}`)
      const data = await res.json()

      setQueues(data.queues)
    }

    const intervalData = setInterval(fetchData, 7000)
    return () => clearInterval(intervalData)
  }, [])

  useEffect(() => {
    const synth = window.speechSynthesis
    const voices = synth.getVoices()

    for (let i = 0; i < queues?.length; i++) {
      const queue = queues[i]
      if (queue.current_call_queue_event_rcd === 'CALL') {
        const voiceEn = voices[1]
        utterThis.text = `invite number ${queue.queue_number}`
        utterThis.voice = voiceEn
        speechSynthesis.speak(utterThis)
      }
    }
  }, [queues])

  const handleClickLocation = () => {
    navigate('/')
  }

  return (
    <div>
      <Nav />
      <div className="flex space-between justify-around items-center min-h-screen px-10">
        <div className="grid grid-cols-3 gap-10">
          <div className="h-mainSection min-h-full main-color text-clip overflow-hidden rounded-lg p-4 xl:w-[600px]">
            <div className="text-center text-white text-5xl">
              เรียกคิวชำระเงิน
            </div>
            <div className="text-center text-white text-4xl">
              Call queue cashier
            </div>

            <div className="border-b-2 border-white my-3"></div>

            <div>
              <div className="flex justify-between">
                <p className="text-white text-center text-4xl">QN</p>

                <p className="text-white text-center text-4xl">Couter</p>
              </div>

              {queues &&
                queues
                  .filter(
                    (queue) =>
                      queue.current_call_queue_event_rcd === 'WAITING' &&
                      queue.call_queue_type_rcd === 'CASHIER'
                  )
                  .map((queue, index) => (
                    <div
                      className="flex justify-around my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                      key={index}
                    >
                      <p className="text-white text-center text-7xl">
                        {queue.queue_number}
                      </p>

                      <p className="text-white text-center text-7xl">
                        {index + 1}
                        {/* {queue.call_display_info} */}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          <div className="h-mainSection min-h-full main-color text-clip overflow-hidden rounded-lg p-4">
            <div className="text-center text-white text-5xl">รอเรียกคิว</div>
            <div className="text-center text-white text-4xl">Waiting queue</div>

            <div className="border-b-2 border-white my-3"></div>

            <div>
              <div className="flex justify-between opacity-0">
                <p className="text-white text-center text-4xl">QN</p>

                <p className="text-white text-center text-4xl">Couter</p>
              </div>

              {queues &&
                queues
                  .filter(
                    (queue) => queue.current_call_queue_event_rcd === 'WAITING'
                  )
                  .map((queue, index) => (
                    <div key={index}>
                      <p className="text-white text-center text-7xl py-2 bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-200 rounded my-2">
                        {queue.queue_number}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          <div className="h-mainSection min-h-full main-color text-clip overflow-hidden rounded-lg p-4">
            <div className="text-center text-white text-5xl">เรียกคิวรับยา</div>
            <div className="text-center text-white text-4xl">
              Call queue pharmacy
            </div>

            <div className="border-b-2 border-white my-3"></div>

            <div>
              <div className="flex justify-between">
                <p className="text-white text-center text-4xl">QN</p>

                <p className="text-white text-center text-4xl">Couter</p>
              </div>

              {queues &&
                queues
                  .filter(
                    (queue) =>
                      queue.current_call_queue_event_rcd === 'CALL' &&
                      queue.call_queue_type_rcd === 'PHARMACY'
                  )
                  .map((queue, index) => (
                    <div
                      className="flex justify-around my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                      key={index}
                    >
                      <p className="text-white text-center text-7xl">
                        {queue.queue_number}
                      </p>

                      <p className="text-white text-center text-7xl">
                        {queue.call_display_info}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          {/* <div className="h-mainSection min-h-full main-color text-clip overflow-hidden rounded-lg p-4">
            <div className="text-center text-white text-2xl">
              QN ที่เรียกแล้ว โปรดติดต่อเคาน์เตอร์
            </div>
            <div className="text-center text-white text-xl">
              Please contact counter
            </div>
            <div>
              {queues &&
                queues
                  .filter(
                    (queue) =>
                      queue.current_call_queue_event_rcd === 'MISSEDCALL'
                  )
                  .map((queue, index) => (
                    <div key={index}>
                      <p className="text-white text-center text-4xl py-2">
                        {queue.queue_number}
                      </p>
                    </div>
                  ))}
            </div>
          </div> */}
        </div>
      </div>

      <div className="fixed right-0 bottom-11 opacity-0 hover:opacity-100 pointer">
        <span className="flex rounded-lg p-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={handleClickLocation}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </span>
      </div>

      <Footer queues={queues} />
    </div>
  )
}
