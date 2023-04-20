import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postDataAPI } from '../utils/fetchData'

export default function Root() {
  const [isOpen, setOpen] = useState(false)
  const [floorsCashier, setFloorsCashier] = useState([])
  const [floorsPharmacy, setFloorsPharmacy] = useState([])
  const [floorSelect, setFloorSelect] = useState([])

  useEffect(() => {
    const dataFetch = async () => {
      const dataCashier = await (
        await fetch('http://10.1.20.36:7071/api/floors/cashier')
      ).json()

      const dataPharmacy = await (
        await fetch('http://10.1.20.36:7071/api/floors/pharmacy')
      ).json()

      setFloorsCashier(dataCashier.floors)
      setFloorsPharmacy(dataPharmacy.floors)
    }

    dataFetch()
  }, [])

  const navigate = useNavigate()

  const handleChangeInputFloor = async (e) => {
    const data = e.target.value

    const res = await postDataAPI('floorId', { name: data })

    const floorId = res.data.floorId.call_queue_id

    setFloorSelect((floorSelect) => [...floorSelect, floorId])
  }

  const handleSubmitFloor = (e) => {
    e.preventDefault()

    navigate(`/floor/${floorSelect[0]}-${floorSelect[1]}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="animate-bounce w-96 h-96 opacity-20 cursor-pointer"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <path
          fillRule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>

      {isOpen ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Floors
                    </h3>

                    <div className="mt-2">
                      <form onSubmit={handleSubmitFloor}>
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="col-span-6 sm:col-span-3">
                            <select
                              id="floor"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              name="floor"
                              value={floorSelect ? floorSelect.name_e : ''}
                              onChange={handleChangeInputFloor}
                            >
                              <option>Select cashier</option>
                              {floorsCashier.map((floorCashier, index) => (
                                <option key={index}>
                                  {floorCashier.name_e}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="col-span-6 sm:col-span-3">
                            <select
                              id="floor"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              name="floor"
                              value={floorSelect ? floorSelect.name_e : ''}
                              onChange={handleChangeInputFloor}
                            >
                              <option>Select pharmacy</option>
                              {floorsPharmacy.map((floorPharmacy, index) => (
                                <option key={index}>
                                  {floorPharmacy.name_e}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSubmitFloor}
                          >
                            Select
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen((isOpen) => !isOpen)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
