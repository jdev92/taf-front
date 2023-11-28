import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import alllocales from "@fullcalendar/core/locales-all";
import ModalEvent from "../components/AddEvent";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [minDate, setMinDate] = useState(new Date().toISOString());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allEvents");
        setEvents(response.data);
      } catch (error) {
        console.log("Erreur lors du chargement des événements:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    setShowModal(true);
    setMinDate(info.dateStr);
  };

  const handleAddEvent = (title, start, end) => {
    const startDateWithoutTime = new Date(start);
    startDateWithoutTime.setHours(0, 0, 0, 0);

    const endDateWithoutTime = new Date(end);
    endDateWithoutTime.setHours(0, 0, 0, 0);

    const newEvent = {
      title: title,
      start: startDateWithoutTime.toISOString(),
      end: endDateWithoutTime.toISOString(),
    };

    setEvents([...events, newEvent]);
    console.log("Nouvel événement ajouté :", newEvent);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 mt-16 overflow-y-auto pt-2 pl-2 pr-2">
        {showModal && (
          <ModalEvent onAddEvent={handleAddEvent} setShowModal={setShowModal} />
        )}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "aujourd'hui",
            month: "mois",
            week: "semaine",
            day: "jour",
            list: "list",
          }}
          titleFormat={{ day: "numeric", month: "long", year: "numeric" }}
          height={"100vh"}
          locales={alllocales}
          locale={"fr"}
          firstDay={1}
          selectable={true}
          events={events}
          dateClick={handleDateClick}
          validRange={{
            start: minDate,
          }}
        />
      </div>
    </div>
  );
};

export default Event;
