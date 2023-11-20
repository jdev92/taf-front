import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import alllocales from "@fullcalendar/core/locales-all";
import ModalEvent from "../components/AddEvent";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [minDate, setMinDate] = useState(new Date().toISOString());

  const handleDateClick = (info) => {
    setShowModal(true);
    setMinDate(info.dateStr);
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
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 mt-16 overflow-y-auto pt-2 pl-2 pr-2">
        <button
          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add event
        </button>
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
