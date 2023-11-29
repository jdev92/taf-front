import axios from "axios";
import { useState, useEffect } from "react";

export default function userPresentModal({ showModal, setShowModal }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [usersPresent, setUsersPresent] = useState([]);

  const fetchUsersPresent = async (date) => {
    try {
    } catch (error) {
      console.log("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Planning du </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form
                className="max-w-[600px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
                onSubmit={handleSave}
              >
                <div className="flex flex-col text-gray-400 py-2">
                  <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-white">Utilisateurs</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
