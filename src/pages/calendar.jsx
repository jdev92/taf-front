import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import alllocales from "@fullcalendar/core/locales-all";
import ModalEvent from "../components/addEvent";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [minDate, setMinDate] = useState(new Date().toISOString());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/calendarEvents"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };

    fetchEvents();
  }, []);

  const transformedEvents = events
    ? events.flatMap((userEvent) =>
        userEvent.dates
          ? userEvent.dates.map((eventDate) => ({
              title: `${userEvent.name}: ${eventDate.title}`,
              start: eventDate.date,
              backgroundColor:
                eventDate.title === "Entreprise" ? "green" : "red",
              allDay: true,
            }))
          : []
      )
    : [];

  const handleDateClick = (info) => {
    setShowModal(true);
    const selectedDate = info.dateStr;

    // Ajouter la nouvelle date à la liste des dates sélectionnées
    setSelectedDates([...selectedDates, selectedDate]);
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
        <style>
          {`
            .fc-time-grid {
              display: none; // Masquer la grille de temps
            }
          `}
        </style>
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
          events={transformedEvents}
          dateClick={handleDateClick}
          validRange={{
            start: minDate,
          }}
          dayMaxEvents={true}
          displayEventTime={false}
        />
      </div>
    </div>
  );
};

export default Event;
