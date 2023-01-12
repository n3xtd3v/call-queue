import React, { useState, useEffect } from 'react'

const App = () => {
  // const [patientsData, setPatientsData] = useState(null)
  // const utterThis = new SpeechSynthesisUtterance()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('src/utils/patientData.json')
  //     const data = await res.json()
  //     console.log(data)
  //     setPatientsData(data)
  //   }

  //   const intervalData = setInterval(fetchData, 10000)
  //   return () => clearInterval(intervalData)
  // }, [])

  // useEffect(() => {
  //   const synth = window.speechSynthesis
  //   const voices = synth.getVoices()

  //   for (let i = 0; i < patientsData?.length; i++) {
  //     const patient = patientsData[i]
  //     if (patient.current_call_queue_rcd === 'CALL') {
  //       if (patient.nationality === 'th') {
  //         const voiceTh = voices[3]
  //         utterThis.text = `invite number ${patient.queue_number}`
  //         utterThis.voice = voiceTh
  //         speechSynthesis.speak(utterThis)
  //       } else if (patient.nationality === 'en') {
  //         const voiceEn = voices[1]
  //         utterThis.text = `invite number ${patient.queue_number}`
  //         utterThis.voice = voiceEn
  //         speechSynthesis.speak(utterThis)
  //       }
  //     }
  //   }
  // }, [patientsData])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default App
