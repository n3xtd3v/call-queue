import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    for (let i = 0; i < queues?.length; i++) {
      const queue = queues[i];
      if (queue.current_call_queue_event_rcd === "CALL") {
        const voiceEn = voices[1];
        console.log(
          `invite number ${queue.queue_number
            .split("")
            .join(" ")} please contact counter`
        );
        utterThis.text = `invite number ${queue.queue_number
          .split("")
          .join(" ")} please contact counter`;
        utterThis.voice = voiceEn;
        utterThis.pitch = 1;
        utterThis.rate = 0.6;
        speechSynthesis.speak(utterThis);
      }
    }
  }, [queues]);

  return (
    <>
      <div className="grid gap-10 text-center text-white md:text-2xl lg:grid-cols-2 2xl:grid-cols-5 lg:text-3xl xl:text-4xl 2xl:text-5xl justify-center items-center min-h-screen p-9">
        <div className="main-color p-10 rounded-xl h-[850px] truncate">
          <div className="">รอเรียกคิวชำระเงิน</div>
          <div className="xl:text-3xl">Waiting queue cashier</div>

          <div className="border-b-2 border-white my-3"></div>

          <div className="flex justify-between opacity-0">
            <p className="">QN</p>

            <p className="">Counter</p>
          </div>

          {queues &&
            queues
              .filter(
                (queue) =>
                  queue.current_call_queue_event_rcd === "WAITING" &&
                  queue.call_queue_type_rcd === "CASHIER"
              )
              .map((queue, index) => (
                <div
                  className="flex justify-center p-5 my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                  key={index}
                >
                  <p className="">{queue.queue_number}</p>
                </div>
              ))}
        </div>

        <div className="main-color p-10 rounded-xl h-[850px] truncate">
          <div className="">เรียกคิวชำระเงิน</div>
          <div className="xl:text-3xl">Call queue cashier</div>

          <div className="border-b-2 border-white my-3"></div>

          <div className="flex justify-between">
            <p className="">QN</p>

            <p className="">Counter</p>
          </div>

          {queues &&
            queues
              .filter(
                (queue) =>
                  queue.current_call_queue_event_rcd === "CALL" &&
                  queue.call_queue_type_rcd === "CASHIER"
              )
              .map((queue, index) => (
                <div
                  className="flex justify-between p-5 my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                  key={index}
                >
                  <p className="">{queue.queue_number}</p>

                  <p className="">{index + 1}</p>
                </div>
              ))}
        </div>

        <div className="main-color p-10 rounded-xl h-[850px] truncate">
          <div className="">รอเรียกคิวรับยา</div>
          <div className="xl:text-3xl">Waiting queue pharmacy</div>

          <div className="border-b-2 border-white my-3"></div>

          <div className="flex justify-between opacity-0">
            <p className="">QN</p>

            <p className="">Counter</p>
          </div>

          {queues &&
            queues
              .filter(
                (queue) =>
                  queue.current_call_queue_event_rcd === "WAITING" &&
                  queue.call_queue_type_rcd === "PHARMACY"
              )
              .map((queue, index) => (
                <div
                  className="flex justify-center p-5 my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                  key={index}
                >
                  <p className="">{queue.queue_number}</p>
                </div>
              ))}
        </div>

        <div className="main-color p-10 rounded-xl h-[850px] truncate">
          <div className="">เรียกคิวรับยา</div>
          <div className="xl:text-3xl">Call queue pharmacy</div>

          <div className="border-b-2 border-white my-3"></div>

          <div className="flex justify-between">
            <p className="">QN</p>

            <p className="">Counter</p>
          </div>

          {queues &&
            queues
              .filter(
                (queue) =>
                  queue.current_call_queue_event_rcd === "CALL" &&
                  queue.call_queue_type_rcd === "PHARMACY"
              )
              .map((queue, index) => (
                <div
                  className="flex justify-between p-5 my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                  key={index}
                >
                  <p className="">{queue.queue_number}</p>

                  <p className="">{index + 1}</p>
                </div>
              ))}
        </div>

        <div className="main-color p-10 rounded-xl h-[850px] truncate">
          <div className="">เรียกผ่านไปแล้ว</div>
          <div className="xl:text-3xl">Missed call</div>

          <div className="border-b-2 border-white my-3"></div>

          <div className="flex justify-between opacity-0">
            <p className="">QN</p>

            <p className="">Counter</p>
          </div>

          {queues &&
            queues
              .filter(
                (queue) => queue.current_call_queue_event_rcd === "MISSEDCALL"
              )
              .map((queue, index) => (
                <div
                  className="flex justify-between p-5 my-2 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 py-2 rounded"
                  key={index}
                >
                  <p className="">{queue.queue_number}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
export default floor;
