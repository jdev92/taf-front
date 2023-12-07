import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { RotatingLines } from "react-loader-spinner";
import UserModal from "../components/UserModal";

const Users = () => {
  const [userId, setUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [searchOption, setSearchOption] = useState("all");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    id: null,
  });
  const selectedUser = data.find((user) => user._id === selectedUserId);
  const selectedUserName = selectedUser
    ? `${selectedUser.firstName} ${selectedUser.lastName}`
    : "";

  const getUserNameById = (userId) => {
    const user = data.find((user) => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  };

  const handleOpenModal = (userId) => {
    setShowModal(true);
    setSelectedUserId(userId);
  };

  const handleAddEvent = (title, start, end) => {
    const newEvent = {
      title: title,
      start: start,
      end: end,
    };
    setEvents([...events, newEvent]);
    console.log("Nouvel événement ajouté :", newEvent);
  };

  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  const handleOpenDialog = (id) => {
    setConfirmDialog({
      isOpen: true,
      id: id,
    });
  };

  const handleCloseDialog = () => {
    setConfirmDialog({
      isOpen: false,
      id: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/userEvents/${id}`
      );
      const userEvents = response.data;

      // Supprimer chaque événement de l'utilisateur
      for (const event of userEvents) {
        await axios.delete(`http://localhost:3000/deleteEvent/${event._id}`);
      }
      // Supprimer l'utilisateur
      await axios.delete(`http://localhost:3000/users/${id}`);

      setData(data.filter((user) => user._id !== id));
      handleCloseDialog();
      handleAlert();
      console.log("Utilisateur et ses événements supprimés avec succès.");
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      setData(response.data);
      setTotalUsers(response.data.length);
      setIsLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const options = data.map((user) => ({
      value: user._id,
      label: `${user.firstName} ${user.lastName}`,
    }));
    setUserOptions(options);
  }, [data]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await axios.get("http://localhost:3000/users");
        if (searchOption === "all") {
          response = await axios.get(`http://localhost:3000/users`, {
            params: { page: currentPage, searchTerm },
          });
        } else {
          response = await axios.get(
            `http://localhost:3000/userDetails/${userId}`
          );
        }
        setData(response.data);
        setSelectedUserId(userId);
      } catch (error) {
        console.log("Erreur lors du chargement des utilisateurs:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (user) =>
        (user.firstName &&
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName &&
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  // Calcul de l'index de début et de fin pour extraire les utilisateurs de la page actuelle
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredData.slice(startIndex, endIndex);

  const navigate = useNavigate();
  const handleUserSelect = (userId) => {
    navigate(`/userDetails/${userId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* Contenu principal */}
      <div className="flex flex-col bg-gray-900 items-center justify-center h-screen flex-1">
        {/* Affichage de l'alerte si l'utilisateur est supprimé avec succès */}
        {alert && (
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
            <p>Utilisateur supprimé avec succès.</p>
          </div>
        )}

        <h1 className="text-white text-4xl">Liste des utilisateurs</h1>
        <div className="p-8 rounded-md w-full">
          {!isLoading ? (
            <div className="flex items-center justify-between pb-6">
              <div className="flex items-center justify-between">
                {/* Barre de recherche avec liste déroulante */}

                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <input
                    className="bg-gray-100 outline-none ml-2 block w-96"
                    type="text"
                    name="search"
                    value={searchTerm}
                    onClick={() => setSearchOption("all")}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un utilisateur..."
                  />
                </div>
                {showModal && (
                  <UserModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedUserName={getUserNameById(selectedUserId)}
                    userId={userId}
                  />
                )}
              </div>
            </div>
          ) : (
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
          )}

          {!isLoading && (
            <div>
              {filteredData.length === 0 ? (
                <p className="text-white">Aucun utilisateur trouvé</p>
              ) : (
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <p className="text-white pb-4">
                      Nombre total d'utilisateurs : {totalUsers}
                    </p>
                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Nom
                            </th>
                            <th className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Prénom
                            </th>
                            <th className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Email
                            </th>
                            <th className="px-4 py-3.5 font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers.map((user) => (
                            <tr key={user._id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                {user.lastName}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                {user.firstName}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                {user.email}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-gray-900 text-white">
                                <div className="flex item-center ">
                                  <div
                                    onClick={() => handleOpenModal(user._id)}
                                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                      />
                                    </svg>
                                  </div>
                                  <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                    <Link to={`/userDetails/${user._id}`}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                  <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                    <Link to={`/update/${user._id}`}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                  <div
                                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer"
                                    onClick={() => handleOpenDialog(user._id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center items-center flex-col mt-4">
                <div className="flex">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Suivant
                  </button>
                </div>
                {totalPages > 1 && (
                  <p className="text-white mt-2 ">
                    Page {currentPage} sur {totalPages}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {confirmDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="text-white bg-gray-800 p-4 rounded-lg">
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
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
    </div>
  );
};

export default Users;
