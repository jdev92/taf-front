import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { RotatingLines } from "react-loader-spinner";

const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEvents, setUserEvents] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    id: null,
  });
  const [alert, setAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/userEvents/${userId}`
        );
        setUserEvents(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserEvents();
  }, [userId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/userDetails/${userId}`
        );
        setUserDetails(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const { lastName, firstName, email } = userDetails || {};

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-event/${eventId}`);
      // Mettre à jour l'état local userEvents après la suppression
      setUserEvents((prevUserEvents) =>
        prevUserEvents.filter((event) => event._id !== eventId)
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log("Erreur lors de la suppression de l'événement :", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col bg-gray-900 items-center justify-center">
          <RotatingLines
            strokeColor="red"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
          <p className="text-white">Chargement des données...</p>
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden bg-gray-900">
          <Sidebar />
          <section className="container px-4 mx-auto bg-gray-900">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <h1 className="text-white text-4xl mb-4 pt-5">
                    Planning de {lastName} {firstName}
                  </h1>
                  {userEvents.length === 0 ? (
                    <p>Aucun évènement trouvé</p>
                  ) : (
                    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                      <table className="min-w-full leading-normal">
                        <thead>
                          {showAlert && (
                            <div
                              className="flex items-center bg-green-400 text-white text-sm font-bold px-4 py-3 rounded-lg"
                              role="alert"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 mr-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              <p>Evènement supprimé avec succès.</p>
                            </div>
                          )}
                          <tr>
                            <th className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
                              User
                            </th>

                            <th className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
                              Titre
                            </th>

                            <th className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
                              Date de début
                            </th>

                            <th className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
                              Date de fin
                            </th>
                            <th className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userEvents.map((event) => (
                            <tr key={event._id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                    alt="img-user"
                                  />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white text-white">
                                      {lastName} {firstName}
                                    </h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400 text-white">
                                      {email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                {event.title}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                {event.start}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                {event.end}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 transform hover:text-red-500 hover:scale-110 cursor-pointer"
                                  onClick={() => handleDelete(event._id)}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="text-white bg-gray-800 p-4 rounded-lg">
            <p>Êtes-vous sûr de vouloir supprimer cet évènement ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleDelete(confirmDialog.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Supprimer
              </button>
              <button
                onClick={handleCloseDialog}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
