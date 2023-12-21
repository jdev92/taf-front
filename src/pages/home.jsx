import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [enterpriseUsers, setEnterpriseUsers] = useState([]);
  const [coursUsers, setCoursUsers] = useState([]);

  const formattedDate = currentDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEnterpriseUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/presentEnterpriseUsers"
        );

        if (response.data.enterpriseUsers) {
          setEnterpriseUsers(response.data.enterpriseUsers);
        }
        // console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs en entreprise:",
          error
        );
      }
    };

    fetchEnterpriseUsers();
  }, []);

  useEffect(() => {
    const fetchCoursUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/presentCoursUsers"
        );

        if (response.data.coursUsers) {
          setCoursUsers(response.data.coursUsers);
        }
        // console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs en cours:",
          error
        );
      }
    };

    fetchCoursUsers();
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="bg-gray-900 p-7 text-2xl font-semibold flex-1 h-screen">
          <div>
            <h1 className="text-white text-4xl pb-4">Bienvenue</h1>
            <h2 className="text-white text-2xl pb-4">{formattedTime}</h2>
            <h2 className="text-white text-2xl pb-4">{formattedDate}</h2>

            <div className="flex">
              {/* Tableau des utilisateurs en entreprise */}
              <div className="w-1/2 pr-4">
                <h3 className="text-white mb-2 mt-10">
                  Utilisateurs en entreprise
                </h3>
                {enterpriseUsers.length === 0 ? (
                  <p className="text-white">Aucun utilisateur présent</p>
                ) : (
                  <table className="text-white">
                    <tbody>
                      {enterpriseUsers.map((user) => (
                        <tr key={user._id}>
                          <td>
                            {user.lastName} {user.firstName}
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Tableau des utilisateurs en cours */}
              <div className="w-1/2 pl-4">
                <h3 className="text-white mb-2 mt-10">Utilisateurs en cours</h3>
                {coursUsers.length === 0 ? (
                  <p className="text-white">Aucun utilisateur présent</p>
                ) : (
                  <table className="text-white">
                    <tbody>
                      {coursUsers.map((user) => (
                        <tr key={user._id}>
                          <td>
                            {user.lastName} {user.firstName}
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
      </div>
    </>
  );
};

export default Home;
