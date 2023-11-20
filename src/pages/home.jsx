import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const formattedTime = currentTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className=" bg-gray-900 p-7 text-2x1 font-semibold flex-1 h-screen">
          <div className="flex flex-col  items-center justify-center h-screen">
            <h1 className=" text-white text-4xl pb-3">Bienvenue</h1>
            <h2 className="text-white text-2xl pb-4">{formattedTime}</h2>
            <h2 className="text-white text-2xl pb-4">{formattedDate}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
