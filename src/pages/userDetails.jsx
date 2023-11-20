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
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    {userEvents.length === 0 ? (
                      <p>Aucun évènement trouvé</p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              User
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Titre
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Date de début
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Date de fin
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {userEvents.map((event) => (
                            <tr key={event._id}>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                    alt="img-user"
                                  />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                      {lastName} {firstName}
                                    </h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                      {email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {event.title}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {event.start}
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {event.end}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UserDetails;
