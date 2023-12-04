import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [presentUsers, setPresentUsers] = useState([]);

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
    const fetchPresentUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/presentUsers");
        // Vérifier si response.data.presentUsers est défini avant d'appeler map
        if (response.data.presentUsers) {
          setPresentUsers(response.data.presentUsers);
        }
      } catch (error) {
        console.log(
          "Erreur lors de la récupération des utilisateurs présents:",
          error
        );
      }
    };

    fetchPresentUsers();
  }, []); // Appel une seule fois lors du montage du composant

  const formattedTime = currentTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className=" bg-gray-900 p-7 text-2xl font-semibold flex-1 h-screen">
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-white text-4xl pb-3">Bienvenue</h1>
            <h2 className="text-white text-2xl pb-4">{formattedTime}</h2>
            <h2 className="text-white text-2xl pb-4">{formattedDate}</h2>

            <div>
              <h3 className="text-white text-xl pb-2">
                Utilisateurs présents :
              </h3>
              {/* Vérifier si presentUsers est défini avant d'appeler map */}
              {presentUsers && presentUsers.length > 0 ? (
                <ul>
                  {presentUsers.map((user) => (
                    <li key={user._id} className="text-white">
                      {user.firstName} {user.lastName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">
                  Aucun utilisateur présent pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
