import React, { useState, useEffect } from 'react'
// import { useSpeechSynthesis } from 'react-speech-kit'

const App = () => {
  const [patientsData, setPatientsData] = useState(null)
  // const { speak } = useSpeechSynthesis()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('src/utils/patientData.json')
      const data = await res.json()
      setPatientsData(data)
    }

    const intervalData = setInterval(fetchData, 10000)
    return () => clearInterval(intervalData)
  }, [])

  useEffect(() => {
    for (let i = 0; i < patientsData?.length; i++) {
      const patient = patientsData[i]
      console.log(patient)
      if (patient.current_call_queue_rcd === 'CALL') {
        // speak({
        //   text: patient.queue_number,
        //   voices: {
        //     default: true,
        //     lang: 'th-TH',
        //     localService: true,
        //     name: 'Karen',
        //     voiceURI: 'Karen',
        //   },
        // })
      }
    }
  }, [patientsData])

  return <div>Hello World</div>
}

export default App
