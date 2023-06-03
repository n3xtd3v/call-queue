import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/floor.css";

const floor = () => {
  const [queues, setQueues] = useState([]);
  const [openOptionSpeak, setOpenOptionSpeak] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectVoice, setSelectVoice] = useState(null);
  const [textSpeech, setTextSpeech] = useState("");
  const [rate, setRate] = useState(null);
  const [pitch, setPitch] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);

  const { floorId } = useParams();

  if (!floorId) {
    useParams();
  }

  const navigate = useNavigate();
  const synth = window.speechSynthesis;

  useEffect(() => {
    function getVoices() {
      let voicesName = [];
      const voices = synth.getVoices();

      voices.forEach((voice) => {
        voicesName.push(voice.name);
      });
      setVoices(voicesName);
    }

    getVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = getVoices;
    }
  }, []);

  const fetchDataQueues = async () => {
    const response = await fetch(
      `http://10.1.20.36:7071/api/queues/${floorId}`
    );

    const data = await response.json();

    setQueues(data.queues);
  };

  useEffect(() => {
    setInterval(() => {
      fetchDataQueues();
    }, 1000);
  }, []);

  useEffect(() => {
    if (queues.length > 0 && synth.speaking === false) {
      const utterance = new SpeechSynthesisUtterance();
      const voices = synth.getVoices();

      const filterVoiceAria = voices.filter(
        (voice) =>
          voice.voiceURI ===
          "Microsoft Aria Online (Natural) - English (United States)"
      );

      const filterPremwadee = voices.filter(
        (voice) =>
          voice.voiceURI ===
          "Microsoft Premwadee Online (Natural) - Thai (Thailand)"
      );

      // const filterVoiceGuy = voices.filter(
      //   (voice) =>
      //     voice.voiceURI ===
      //     "Microsoft Guy Online (Natural) - English (United States)"
      // );

      const queuesCall = queues.filter(
        (queue) => queue.current_call_queue_event_rcd === "CALL"
      );

      for (let i = 0; i < queuesCall.length; i++) {
        utterance.text =
          queuesCall[i].lang === "TH"
            ? ` หมายเลข ${queuesCall[i].queue_number
                .split("")
                .join(" ")} โปรดติดต่อ${
                queuesCall[i].call_display_info.slice(0, 7) === "Cashier"
                  ? `การเงิน`
                  : `เภสัช`
              } ${queuesCall[i].call_display_info.slice(8, 9)}`
            : ` Number ${queuesCall[i].queue_number
                .split("")
                .join(" ")} please contact ${queuesCall[i].call_display_info} `;

        utterance.voice = selectVoice
          ? (utterance.voice = synth.getVoices().filter(function (voice) {
              return voice.name == selectVoice;
            })[0])
          : queuesCall[i].lang === "TH"
          ? filterPremwadee[0]
          : filterVoiceAria[0];

        utterance.pitch = pitch;
        utterance.rate = rate;
        synth.speak(utterance);
      }

      // let queuesCalltoString = queuesCall.map(
      //   ({ queue_number, call_display_info }) =>
      //     ` Number ${queue_number
      //       .split("")
      //       .join(" ")} please contact ${call_display_info} `
      // );

      //   utterance.text = queuesCalltoString;

      //   utterance.voice = selectVoice
      //     ? (utterance.voice = synth.getVoices().filter(function (voice) {
      //         return voice.name == selectVoice;
      //       })[0])
      //     : filterVoiceAria[0];
      //   utterance.pitch = pitch;
      //   utterance.rate = rate;
      //   synth.speak(utterance);
      //   utterance.onend = () => {
      //     synth.cancel();
      //   };
    }
  }, [queues]);

  function filterQueueCall(event, type, display) {
    return queues?.filter(
      (queue) =>
        queue.current_call_queue_event_rcd === event &&
        queue.call_queue_type_rcd === type &&
        queue.call_display_info === display
    );
  }

  const cashierCall_1 = filterQueueCall("CALL", "CASHIER", "Cashier 1");
  const cashierCallServing_1 = filterQueueCall(
    "SERVING",
    "CASHIER",
    "Cashier 1"
  );

  const cashierCall_2 = filterQueueCall("CALL", "CASHIER", "Cashier 2");
  const cashierCallServing_2 = filterQueueCall(
    "SERVING",
    "CASHIER",
    "Cashier 2"
  );

  const cashierCall_3 = filterQueueCall("CALL", "CASHIER", "Cashier 3");
  const cashierCallServing_3 = filterQueueCall(
    "SERVING",
    "CASHIER",
    "Cashier 3"
  );

  const cashierCall_4 = filterQueueCall("CALL", "CASHIER", "Cashier 4");
  const cashierCallServing_4 = filterQueueCall(
    "SERVING",
    "CASHIER",
    "Cashier 4"
  );

  const pharmacyCall_1 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 1");
  const pharmacyCallServing_1 = filterQueueCall(
    "SERVING",
    "PHARMACY",
    "Pharmacy 1"
  );

  const pharmacyCall_2 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 2");
  const pharmacyCallServing_2 = filterQueueCall(
    "SERVING",
    "PHARMACY",
    "Pharmacy 2"
  );

  const pharmacyCall_3 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 3");
  const pharmacyCallServing_3 = filterQueueCall(
    "SERVING",
    "PHARMACY",
    "Pharmacy 3"
  );

  const pharmacyCall_4 = filterQueueCall("CALL", "PHARMACY", "Pharmacy 4");
  const pharmacyCallServing_4 = filterQueueCall(
    "SERVING",
    "PHARMACY",
    "Pharmacy 4"
  );

  function filterQueueWaiting(event, type) {
    return queues?.filter(
      (queue) =>
        queue.current_call_queue_event_rcd === event &&
        queue.call_queue_type_rcd === type
    );
  }

  const cashiersWaiting = filterQueueWaiting("WAITING", "CASHIER");
  const pharmacysWaiting = filterQueueWaiting("WAITING", "PHARMACY");

  const cashiersReady = filterQueueWaiting("READY", "CASHIER");
  const pharmacysReady = filterQueueWaiting("READY", "PHARMACY");

  const combineWaitingAndReady = (waiting, ready) => {
    return [...waiting, ...ready];
  };

  const combineCashiers = combineWaitingAndReady(
    [...cashiersWaiting],
    [...cashiersReady]
  );
  let combineCashiersNumber = [];
  combineCashiers.forEach((combineCashier) => {
    combineCashiersNumber.push(combineCashier.queue_number);
  });

  const combinePharmacys = combineWaitingAndReady(
    [...pharmacysWaiting],
    [...pharmacysReady]
  );
  let combinePharmacysNumber = [];
  combinePharmacys.forEach((combinePharmacy) => {
    combinePharmacysNumber.push(combinePharmacy.queue_number);
  });

  function filterQueueMissedCall(event, type) {
    return queues?.filter(
      (queue) =>
        queue.current_call_queue_event_rcd === event &&
        queue.call_queue_type_rcd === type
    );
  }

  const cashiersMissedCall = filterQueueMissedCall("MISSEDCALL", "CASHIER");
  let cashiersMissedCallNumber = [];
  cashiersMissedCall.forEach((cashierMissedCall) => {
    cashiersMissedCallNumber.push(cashierMissedCall.queue_number);
  });

  const pharmacysMissedCall = filterQueueMissedCall("MISSEDCALL", "PHARMACY");
  let pharmacysMissedCallNumber = [];
  pharmacysMissedCall.forEach((pharmacyMissedCall) => {
    pharmacysMissedCallNumber.push(pharmacyMissedCall.queue_number);
  });

  const handleChangeTextSpeech = (e) => {
    const { value } = e.target;
    setTextSpeech(value);
  };

  const handleSelectLanguage = (e) => {
    const { value } = e.target;
    setSelectVoice(value);
  };

  const handleChangePitch = (e) => {
    setPitch(e.target.value);
  };

  const handleChangeRate = (e) => {
    setRate(e.target.value);
  };

  const handleSpeak = (e) => {
    e.preventDefault();
    const synth = window.speechSynthesis;
    const speakText = new SpeechSynthesisUtterance();
    speakText.voice = synth.getVoices().filter(function (voice) {
      return voice.name == selectVoice;
    })[0];
    speakText.text = textSpeech;
    speakText.rate = rate;
    speakText.pitch = pitch;
    synth.speak(speakText);
  };

  const handleResetSettingVoice = (e) => {
    e.preventDefault();
    setTextSpeech("");
    setPitch(null);
    setRate(null);
  };

  const handleClickIconLocation = () => {
    navigate("/");
  };

  const handleFullscreen = () => {
    if (fullscreenMode) {
      document.exitFullscreen();
      setFullscreenMode(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullscreenMode(!fullscreenMode);
    }
  };

  let timer;
  document.addEventListener("mousemove", () => {
    document.body.style.cursor = "default";
    clearTimeout(timer);
    timer = setTimeout(mouseStopped, 2000);
  });

  function mouseStopped() {
    document.body.style.cursor = "none";
  }

  return (
    <>
      <div className="w-7 h-7 fixed top-0 right-0 dropdown">
        <div className="dropdown-menu">
          <div className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer opacity-80 hover:opacity-100"
              onClick={() => setOpenOptionSpeak(!openOptionSpeak)}
            >
              <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            </svg>
          </div>

          <div className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer opacity-80 hover:opacity-100"
              onClick={handleClickIconLocation}
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer opacity-80 hover:opacity-100"
              viewBox="0 0 16 16"
              onClick={() => handleFullscreen()}
            >
              <path d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
            </svg>
          </div>

          <div className="mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer bi bi-info-circle-fill opacity-80 hover:opacity-100"
              viewBox="0 0 16 16"
              onClick={() => setOpenInfo(!openInfo)}
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />{" "}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 min-h-screen justify-center items-center text-white text-center px-10 text-5xl">
        <div className="flex flex-col justify-items-center items-center">
          <div className="main-color w-full my-3 p-5 border border-black ">
            Cashier / การเงิน
          </div>

          <div className="flex flex-col justify-center items-center main-color w-full border p-5 border-black">
            <table className="border-collapse border border-white m-4 w-full secondary-color text-black">
              <thead>
                <tr className="text-3xl">
                  <th className="border-4 border-white p-5">Service Number</th>
                  <th className="border-4 border-white p-5">
                    Counter / ช่องชำระเงิน
                  </th>
                </tr>
              </thead>
              <tbody className="font-black">
                <tr>
                  <td className="border-4 border-white p-5">
                    {cashierCall_1?.[0]
                      ? cashierCall_1?.[0].queue_number
                      : cashierCallServing_1?.[0]
                      ? cashierCallServing_1?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">1</td>
                </tr>

                <tr>
                  <td className="border-4 border-white p-5">
                    {cashierCall_2?.[0]
                      ? cashierCall_2?.[0].queue_number
                      : cashierCallServing_2?.[0]
                      ? cashierCallServing_2?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">2</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                    {cashierCall_3?.[0]
                      ? cashierCall_3?.[0].queue_number
                      : cashierCallServing_3?.[0]
                      ? cashierCallServing_3?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">3</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                    {cashierCall_4?.[0]
                      ? cashierCall_4?.[0].queue_number
                      : cashierCallServing_4?.[0]
                      ? cashierCallServing_4?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">4</td>
                </tr>
              </tbody>
            </table>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling">
                WAITING / รอชำระเงิน {combineCashiersNumber.join(", ")}
              </div>
            </div>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling text-yellow-300">
                MISSED CALL / กรุณาติดต่อการเงิน{" "}
                {cashiersMissedCallNumber.join(", ")}
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
                <tr className="text-3xl">
                  <th className="border-4 border-white p-5">Service Number</th>
                  <th className="border-4 border-white p-5">
                    Counter / ช่องรับยา
                  </th>
                </tr>
              </thead>
              <tbody className="font-black">
                <tr>
                  <td className="border-4 border-white p-5">
                    {pharmacyCall_1?.[0]
                      ? pharmacyCall_1?.[0].queue_number
                      : pharmacyCallServing_1?.[0]
                      ? pharmacyCallServing_1?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">1</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                    {pharmacyCall_2?.[0]
                      ? pharmacyCall_2?.[0].queue_number
                      : pharmacyCallServing_2?.[0]
                      ? pharmacyCallServing_2?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">2</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                    {pharmacyCall_3?.[0]
                      ? pharmacyCall_3?.[0].queue_number
                      : pharmacyCallServing_3?.[0]
                      ? pharmacyCallServing_3?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">3</td>
                </tr>
                <tr>
                  <td className="border-4 border-white p-5">
                    {pharmacyCall_4?.[0]
                      ? pharmacyCall_4?.[0].queue_number
                      : pharmacyCallServing_4?.[0]
                      ? pharmacyCallServing_4?.[0].queue_number
                      : ""}
                  </td>
                  <td className="border-4 border-white p-5">4</td>
                </tr>
              </tbody>
            </table>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling">
                WAITING / รอรับยา {combinePharmacysNumber.join(", ")}
              </div>
            </div>

            <div className="main-color w-full my-3 p-5 border border-black whitespace-nowrap truncate">
              <div className="scrolling text-yellow-300">
                MISSED CALL / กรุณาติดต่อเภสัชกร{" "}
                {pharmacysMissedCallNumber.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openOptionSpeak && (
        <div className="modal">
          <div className="modal-content">
            <form>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Settings voice
                  </h2>

                  <span
                    className="close"
                    onClick={() => setOpenOptionSpeak(!setOpenOptionSpeak)}
                  >
                    &times;
                  </span>
                </div>

                <div className="text-center">
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Text to speech
                      </label>
                      <div className="mt-2">
                        <div className="mt-2">
                          <input
                            type="text"
                            name="textToSpeech"
                            id="textToSpeech"
                            className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                            value={textSpeech}
                            onChange={handleChangeTextSpeech}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Voice
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          onChange={handleSelectLanguage}
                        >
                          {voices.map((voice, index) => (
                            <option key={index} value={voice}>
                              {voice}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <div className="flex justify-around">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Pitch
                        </label>

                        <p>{pitch !== null ? pitch : 1}</p>
                      </div>

                      <div className="mt-2">
                        <input
                          id="pitch"
                          type="range"
                          min="0.1"
                          max="2"
                          value={pitch !== null ? pitch : 1}
                          step="0.1"
                          className="block w-full"
                          onChange={handleChangePitch}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <div className="flex justify-around">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Rate
                        </label>

                        <p>{rate !== null ? rate : 0.7}</p>
                      </div>

                      <div className="mt-2">
                        <input
                          id="rate"
                          type="range"
                          min="0.1"
                          max="10"
                          value={rate !== null ? rate : 0.7}
                          step="0.1"
                          className="block w-full"
                          onChange={handleChangeRate}
                        />
                      </div>

                      <div className="flex justify-evenly">
                        <button
                          className="flex justify-center items-center my-5 bg-black text-white"
                          onClick={handleResetSettingVoice}
                        >
                          <p>Reset</p>
                          <span className="ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              className="bi bi-arrow-counterclockwise"
                              viewBox="0 0 16 16"
                              id="IconChangeColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                                id="mainIconPathAttribute"
                                stroke="#ffffff"
                                fill="#ffffff"
                                strokeWidth="0.2"
                              ></path>
                              <path
                                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
                                id="mainIconPathAttribute"
                                stroke="#ffffff"
                                fill="#ffffff"
                              ></path>
                            </svg>
                          </span>
                        </button>

                        <button
                          className="flex justify-center items-center my-5 bg-black text-white"
                          onClick={handleSpeak}
                        >
                          <p>Speak</p>
                          <span className="ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              fill="currentColor"
                              className="bi bi-volume-up"
                              viewBox="0 0 16 16"
                              id="IconChangeColor"
                            >
                              <path
                                d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
                                id="mainIconPathAttribute"
                                strokeWidth="2"
                              ></path>
                              <path
                                d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
                                id="mainIconPathAttribute"
                              ></path>
                              <path
                                d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"
                                id="mainIconPathAttribute"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {openInfo && (
        <div className="modal">
          <div className="modal-content">
            <div className="space-y-5">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold leading-7">วิธีการใช้งาน</h2>

                <span className="close" onClick={() => setOpenInfo(!openInfo)}>
                  &times;
                </span>
              </div>

              <div>
                <h2 className="text-lg font-semibold leading-7">
                  เริ่มต้นใช้งาน
                </h2>
                <p>
                  - เปิดเว็บบราวเซอร์โดยใช้ Microsoft edge{" "}
                  <span>
                    <img
                      src="/images/Microsoft_Edge_logo_(2019).png"
                      alt="browser"
                      width="20px"
                      height="20px"
                      className="inline-block"
                    />
                  </span>{" "}
                  Queue Monitoring ที่หน้า Desktop หรือ พิมพ์ URL
                  http://10.1.20.36:7070
                </p>
                <p>- เลือกชั้นที่จะแสดง Queue</p>

                <br />

                <h2 className="text-lg font-semibold leading-7">
                  การตั้งค่าอื่นๆ
                </h2>
                <p>
                  - เลื่อนเมาส์ไปชี้ที่มุมบนขวาสุด{" "}
                  <span>
                    <img
                      src="/images/Screenshot 2023-06-03 141045.jpg"
                      alt="browser"
                      width="100px"
                      height="50px"
                      className="inline-block"
                    />
                  </span>{" "}
                  จะมีเมนูขึ้นมา{" "}
                  <span>
                    <img
                      src="/images/Screenshot 2023-06-03 141247.jpg"
                      alt="browser"
                      width="100px"
                      height="50px"
                      className="inline-block"
                    />
                  </span>{" "}
                </p>

                <p>
                  -{" "}
                  <span>
                    <img
                      src="/images/info.jpg"
                      alt="info"
                      width="30px"
                      height="30px"
                      className="inline-block"
                    />
                  </span>{" "}
                  ข้อมูลวิธีการใช้งาน
                </p>

                <p>
                  -{" "}
                  <span>
                    <img
                      src="/images/fullscreen.jpg"
                      alt="fullscreen"
                      width="30px"
                      height="30px"
                      className="inline-block"
                    />
                  </span>{" "}
                  ขยายหน้าจอ Fullscreen หรือ กด F11
                </p>

                <p>
                  -{" "}
                  <span>
                    <img
                      src="/images/location.jpg"
                      alt="location"
                      width="30px"
                      height="30px"
                      className="inline-block"
                    />
                  </span>{" "}
                  กลับไปหน้าเลือกชั้น
                </p>

                <p>
                  -{" "}
                  <span>
                    <img
                      src="/images/setting.jpg"
                      alt="setting"
                      width="30px"
                      height="30px"
                      className="inline-block"
                    />
                  </span>{" "}
                  ตั้งค่าเสียง
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default floor;
