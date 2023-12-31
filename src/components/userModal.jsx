import axios from "axios";
import React, { useState, useEffect } from "react";

const UserModal = ({ selectedUserName, showModal, setShowModal }) => {
  const [option1, setOption1] = useState(false); // (Cours)
  const [option2, setOption2] = useState(false); // (Entreprise)
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Erreur lors du chargement des utilisateurs:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleOption1 = () => {
    setOption1(true);
    setOption2(false);
  };

  const handleOption2 = () => {
    setOption1(false);
    setOption2(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (userId && (option1 || option2) && start && end) {
      const selectedOption = option1 ? "Cours" : "Entreprise";
      try {
        // filtrer les jours de la semaine
        const joursSelectionnes = selectedDays.map((day) => daysOfWeek[day]);

        // calcule les périodes spécifiques associées à ces jours
        const periodeSelectionnee = joursSelectionnes.map((day) => {
          const date = new Date();
          date.setDate(
            date.getDate() + ((daysOfWeek.indexOf(day) - date.getDay() + 5) % 5)
          );
          return date;
        });

        await axios.post("http://localhost:3000/create-event", {
          userId,
          title: selectedOption,
          start,
          end,
          periode: periodeSelectionnee,
        });
        onAddEvent(selectedOption, start, end);
        setShowModal(false);
        setOption1(false);
        setOption2(false);
        setTitle("");
        setStart("");
        setEnd("");
      } catch (error) {
        console.log("Erreur lors de l'enregistrement de l'événement:", error);
      }
    }
  };

  const handleDaySelect = (day) => {
    const isSelected = selectedDays.includes(day);
    if (isSelected) {
      setSelectedDays(selectedDays.filter((selected) => selected !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Ajouter un planning</h3>

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
                <div className="flex flex-col text-gray-400 py-2 ">
                  <div className="flex flex-col text-gray-400 py-2 mb-2">
                    <label className="text-gray-400">
                      Utilisateur sélectionné
                    </label>
                    <span className="text-white">{selectedUserName}</span>
                  </div>
                  <label className="text-gray-400">Title</label>
                  <div className="flex items-center text-gray-400 py-2 gap-2 mb-2">
                    <label
                      className={`text-white ${option1 ? "text-red-500" : ""}`}
                    >
                      Cours
                    </label>
                    <input
                      type="checkbox"
                      checked={option1}
                      onChange={handleOption1}
                    />
                    <label className="text-white ml-2">Entreprise</label>
                    <input
                      type="checkbox"
                      checked={option2}
                      onChange={handleOption2}
                      className="ml-1"
                    />
                  </div>
                  <div className="flex flex-col text-gray-400 py-2">
                    <label className="text-gray-400">Jours de la semaine</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {daysOfWeek.map((day, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedDays.includes(index)}
                            onChange={() => handleDaySelect(index)}
                            className="ml-1"
                          />
                          <label className="text-white ml-2">{day}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-gray-400 py-2">
                  <label className="text-white">Date de début</label>
                  <input
                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                  <label className="text-white">Date de fin</label>
                  <input
                    className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                <button
                  className="w-full my-5 py-2 bg-teal-500 text-white rounded-lg"
                  type="submit"
                >
                  Enregistrer
                </button>
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
};

export default UserModal;
