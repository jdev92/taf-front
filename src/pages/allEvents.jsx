import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/allEvents`);
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEvents();
  }, []);

  const eventsPerPage = 10;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-900">
        <Sidebar />
        <div className="flex flex-grow justify-center items-center">
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
            <section className="container px-4 mx-auto bg-gray-900">
              <h1 className="text-4xl pb-2 text-white mb-4">
                Listes des plannings
              </h1>
              <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3.5  font-normal text-left rtl:text-right text-white dark:text-gray-400 bg-gray-900"
                            >
                              Utilisateurs
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5  font-normal text-left rtl:text-right text-white dark:text-gray-400 bg-gray-900"
                            >
                              Titre
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5  font-normal text-left rtl:text-right text-white dark:text-gray-400 bg-gray-900"
                            >
                              Date de début
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5  font-normal text-left rtl:text-right text-white dark:text-gray-400 bg-gray-900"
                            >
                              Date de fin
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {currentEvents.map((event) => (
                            <tr key={event._id}>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap bg-gray-900">
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                    alt="img-user"
                                  />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white text-white">
                                      {event.user.lastName}
                                      {event.user.firstName}
                                    </h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400 text-white">
                                      {event.user.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap bg-gray-900 text-white">
                                {event.title}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap bg-gray-900 text-white">
                                {event.start}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap bg-gray-900 text-white">
                                {event.end}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
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
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
