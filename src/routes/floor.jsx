import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/floor.css";

const floor = () => {
  const [queues, setQueues] = useState(null);
  // const utterThis = new SpeechSynthesisUtterance();

  const { floorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:7070/api/queues/${floorId}`);
      const data = await res.json();

      setQueues(data.queues);
    };

    const intervalData = setInterval(fetchData, 7000);
    return () => clearInterval(intervalData);
  }, []);

  console.log('queues', queues);
  // useEffect(() => {
  //   const synth = window.speechSynthesis;
  //   const voices = synth.getVoices();

  //   for (let i = 0; i < queues?.length; i++) {
  //     const queue = queues[i];
  //     if (queue.current_call_queue_event_rcd === "CALL") {
  //       const voiceEn = voices[1];
  //       utterThis.text = `invite number ${queue.queue_number
  //         .split("")
  //         .join(" ")} please contact counter`;
  //       utterThis.voice = voiceEn;
  //       utterThis.pitch = 1;
  //       utterThis.rate = 0.6;
  //       speechSynthesis.speak(utterThis);
  //     }
  //   }
  // }, [queues]);

  function filterQueueCall(event, type, display) {
    return queues?.filter(
      (queue) =>
        queue.current_call_queue_event_rcd === event &&
        queue.call_queue_type_rcd === type &&
        queue.call_display_info === display
    );
  }

  function filterQueueWaiting(event, type) {
    console.log('event', event);
    return queues?.filter(
      (queue) =>
        queue.current_call_queue_event_rcd === event &&
        queue.call_queue_type_rcd === type
    );
  }

  function filterQueueMissedCall(event, type) {
    return queues?.filter(
      (queue) =>
        queue.current_call_queue_event_rcd === event &&
        queue.call_queue_type_rcd === type
    );
  }
  

  const cashierCall_1 = filterQueueCall("CALL", "CASHIER", "Cashier 1");
  const cashierCall_2 = filterQueueCall("CALL", "CASHIER", "Cashier 2");
  const cashierCall_3 = filterQueueCall("CALL", "CASHIER", "Cashier 3");
  const cashierCall_4 = filterQueueCall("CALL", "CASHIER", "Cashier 4");

  const cashierCallServing_1 = filterQueueCall("SERVING", "CASHIER", "Cashier 1");
  const cashierCallServing_2 = filterQueueCall("SERVING", "CASHIER", "Cashier 2");
  const cashierCallServing_3 = filterQueueCall("SERVING", "CASHIER", "Cashier 3");
  const cashierCallServing_4 = filterQueueCall("SERVING", "CASHIER", "Cashier 4");
  
  const pharmacyCall_1 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 1");
  const pharmacyCall_2 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 2");
  const pharmacyCall_3 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 3");
  const pharmacyCall_4 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 4");

  const pharmacyCallServing_1 = filterQueueCall("SERVING", "PHARMACY", "Pharmacy 1");
  const pharmacyCallServing_2 = filterQueueCall("SERVING", "PHARMACY", "Pharmacy 2");
  const pharmacyCallServing_3 = filterQueueCall("SERVING", "PHARMACY", "Pharmacy 3");
  const pharmacyCallServing_4 = filterQueueCall("SERVING", "PHARMACY", "Pharmacy 4");
  
  const cashiersWaiting = filterQueueWaiting("WAITING", "CASHIER");
  const pharmacysWaiting = filterQueueWaiting("WAITING", "PHARMACY");
  
  const cashiersReady = filterQueueWaiting("READY", "CASHIER");
  const pharmacysReady = filterQueueWaiting("READY", "PHARMACY");
  
  const cashiersMissedCall = filterQueueMissedCall("MISSEDCALL", "CASHIER");
  const pharmacysMissedCall = filterQueueMissedCall("MISSEDCALL", "PHARMACY");

  console.log('cashierCallServing_2', cashierCallServing_2);

  const handleClickIconLocation = () => {
    navigate("/");
  };

  return (
    <>
      <div className="w-5 h-5 fixed top-0 right-0 dropdown">
        <div className="dropdown-menu">
          {/* <div className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
          </div> */}

          <div className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={handleClickIconLocation}
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 min-h-screen justify-center items-center text-white text-center px-10 text-5xl">
        <div className="flex flex-col justify-items-center items-center">
          <div className="main-color w-full my-3 p-5 border border-black">
            Cashier / การเงิน
          </div>

          <div className="flex flex-col justify-center items-center main-color w-full border p-5 border-black">
            <table className="border-collapse border border-white m-4 w-full secondary-color text-black">
              <thead>
                <tr>
                  <th className="border-4 border-white p-5">Service Number</th>
                  <th className="border-4 border-white p-5">
                    Counter / ช่องชำระเงิน
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-4 border-white p-5">
                  {cashierCall_1?.[0] ? cashierCall_1?.[0].queue_number 
                    : cashierCallServing_1?.[0] ? cashierCallServing_1?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">1</td>
                </tr>

                <tr>
                  <td className="border-4 border-white p-5">
                    {cashierCall_2?.[0] ? cashierCall_2?.[0].queue_number 
                    : cashierCallServing_2?.[0] ? cashierCallServing_2?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">2</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                  {cashierCall_3?.[0] ? cashierCall_3?.[0].queue_number 
                    : cashierCallServing_3?.[0] ? cashierCallServing_3?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">3</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                  {cashierCall_4?.[0] ? cashierCall_4?.[0].queue_number 
                    : cashierCallServing_4?.[0] ? cashierCallServing_4?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">4</td>
                </tr>
              </tbody>
            </table>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling">
                WAITING / รอชำระเงิน{" "}
                {cashiersWaiting?.map(
                  (cashierWaiting) => cashierWaiting.queue_number + ", "
                )}
                
                {cashiersReady?.map(
                  (cashierReady) => cashierReady.queue_number + ", "
                )}
              </div>
            </div>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling text-yellow-300">
                MISSED CALL / กรุณาติดต่อการเงิน{" "}
                {cashiersMissedCall?.map(
                  (cashierMissedCall) => cashierMissedCall.queue_number + ", "
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-items-center items-center">
          <div className="main-color w-full my-3 p-5 border border-black">
            Pharmacy / เภสัชกรรม
          </div>

          <div className="flex flex-col justify-center items-center main-color w-full border p-5 border-black">
            <table className="border-collapse border border-white m-4 w-full green-color text-black">
              <thead>
                <tr>
                  <th className="border-4 border-white p-5">Service Number</th>
                  <th className="border-4 border-white p-5">
                    Counter / ช่องรับยา
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-4 border-white p-5">
                  {pharmacyCall_1?.[0] ? pharmacyCall_1?.[0].queue_number 
                    : pharmacyCallServing_1?.[0] ? pharmacyCallServing_1?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">1</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                  {pharmacyCall_2?.[0] ? pharmacyCall_2?.[0].queue_number 
                    : pharmacyCallServing_2?.[0] ? pharmacyCallServing_2?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">2</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                  {pharmacyCall_3?.[0] ? pharmacyCall_3?.[0].queue_number 
                    : pharmacyCallServing_3?.[0] ? pharmacyCallServing_3?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">3</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                  {pharmacyCall_4?.[0] ? pharmacyCall_4?.[0].queue_number 
                    : pharmacyCallServing_4?.[0] ? pharmacyCallServing_4?.[0].queue_number 
                    : '' }
                  </td>
                  <td className="border-4 border-white p-5">4</td>
                </tr>
              </tbody>
            </table>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling">
                WAITING / รอรับยา{" "}
                {pharmacysWaiting?.map(
                  (pharmacyWaiting) => pharmacyWaiting.queue_number + ", "
                )}

                {pharmacysReady?.map(
                  (pharmacyReady) => pharmacyReady.queue_number + ", "
                )}
              </div>
            </div>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling text-yellow-300">
                MISSED CALL / กรุณาติดต่อเภสัชกร{" "}
                {pharmacysMissedCall?.map(
                  (pharmacyMissedCall) => pharmacyMissedCall.queue_number + ", "
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default floor;