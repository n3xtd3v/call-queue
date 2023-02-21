import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/floor.css";

const floor = () => {
  const [queues, setQueues] = useState(null);
  const utterThis = new SpeechSynthesisUtterance();

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

  const cashiersWaiting = filterQueueWaiting("WAITING", "CASHIER");
  const cashiersMissedCall = filterQueueMissedCall("MISSEDCALL", "CASHIER");

  const pharmacyCall_1 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 1");
  const pharmacyCall_2 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 2");
  const pharmacyCall_3 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 3");
  const pharmacyCall_4 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 4");

  const pharmacysWaiting = filterQueueWaiting("WAITING", "PHARMACY");
  const pharmacysMissedCall = filterQueueMissedCall("MISSEDCALL", "PHARMACY");

  return (
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
                  {cashierCall_1?.queue_number}
                </td>
                <td className="border-4 border-white p-5">1</td>
              </tr>

              <tr>
                <td className="border-4 border-white p-5">
                  {cashierCall_2?.queue_number}
                </td>
                <td className="border-4 border-white p-5">2</td>
              </tr>
              <tr>
                <td className="border-4 border-white p-5">
                  {cashierCall_3?.queue_number}
                </td>
                <td className="border-4 border-white p-5">3</td>
              </tr>
              <tr>
                <td className="border-4 border-white p-5">
                  {cashierCall_4?.queue_number}
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
          <table className="border-collapse border border-white m-4 w-full green-color">
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
                  {pharmacyCall_1?.queue_number}
                </td>
                <td className="border-4 border-white p-5">1</td>
              </tr>
              <tr>
                <td className="border-4 border-white p-5">
                  {pharmacyCall_2?.queue_number}
                </td>
                <td className="border-4 border-white p-5">2</td>
              </tr>
              <tr>
                <td className="border-4 border-white p-5">
                  {pharmacyCall_3?.queue_number}
                </td>
                <td className="border-4 border-white p-5">3</td>
              </tr>
              <tr>
                <td className="border-4 border-white p-5">
                  {pharmacyCall_4?.queue_number}
                </td>
                <td className="border-4 border-white p-5">4</td>
              </tr>
            </tbody>
          </table>

          <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
            <div className="scrolling">
              WAITING / รอชำระเงิน{" "}
              {pharmacysWaiting?.map(
                (pharmacyWaiting) => pharmacyWaiting.queue_number + ", "
              )}
            </div>
          </div>

          <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
            <div className="scrolling text-yellow-300">
              MISSED CALL / กรุณาติดต่อการเงิน{" "}
              {pharmacysMissedCall?.map(
                (pharmacyMissedCall) => pharmacyMissedCall.queue_number + ", "
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default floor;
