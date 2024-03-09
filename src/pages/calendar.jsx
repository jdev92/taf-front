import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import alllocales from "@fullcalendar/core/locales-all";
import ModalEvent from "../components/addEvent";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../App.css";

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [minDate, setMinDate] = useState(new Date().toISOString());
  const [newEvent, setNewEvent] = useState(null);
  const [refreshCalendar, setRefreshCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);

  // Récupérer les Events
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
  }, [refreshCalendar]);

  // Transformer les Events pour le calendrier
  const transformedEvents = events.flatMap((userEvent) =>
    userEvent.dates
      ? userEvent.dates.map((eventDate) => ({
          title: `${userEvent.name}`,
          start: eventDate.date,
          backgroundColor: eventDate.title === "Entreprise" ? "green" : "blue",
          allDay: true,
        }))
      : []
  );

  // filtrer les Events selon la catégorie sélectionnée
  const filteredEvents =
    filteredCategory === null
      ? transformedEvents
      : transformedEvents.filter(
          (event) =>
            event.backgroundColor ===
            (filteredCategory === "Entreprise" ? "green" : "blue")
        );

  // Gestion du clic sur la date du calendrier
  const handleDateClick = (info) => {
    setShowModal(true);
    const selectedDate = info.dateStr;

    // Ajouter la nouvelle date à la liste des dates sélectionnées
    setSelectedDates([...selectedDates, selectedDate]);
  };

  // Ajout d'un Event
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

    setNewEvent(newEvent);
    setEvents([...events, newEvent]);
    setRefreshCalendar(true);

    console.log("Nouvel événement ajouté ");
  };

  // Gestion du clic sur le bouton d'ajout d'Event
  const handleAddEventButton = () => {
    setShowModal(true);
  };

  // Gestion du clic sur les boutons de catégorie (Entreprise, Cours)
  const handleCategoryButtonClick = (category) => {
    setFilteredCategory(category);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 m overflow-y-auto pt-2 pl-2 pr-2">
        {showModal && (
          <ModalEvent
            onAddEvent={handleAddEvent}
            setShowModal={setShowModal}
            setRefreshCalendar={setRefreshCalendar}
          />
        )}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start:
              "today prev,next addEvent entrepriseButton coursButton resetButton",
            center: "title",
            end: "dayGridMonth,dayGridWeek",
          }}
          customButtons={{
            addEvent: {
              text: "Ajouter un planning",
              click: handleAddEventButton,
            },
            entrepriseButton: {
              text: "Entreprise",
              click: () => handleCategoryButtonClick("Entreprise"),
            },
            coursButton: {
              text: "Cours",
              click: () => handleCategoryButtonClick("Cours"),
            },
            resetButton: {
              text: "Vue globale",
              click: () => handleCategoryButtonClick(null),
            },
          }}
          buttonText={{
            today: "aujourd'hui",
            month: "mois",
            week: "semaine",
            list: "list",
          }}
          titleFormat={{ day: "numeric", month: "long", year: "numeric" }}
          height={"100vh"}
          locales={alllocales}
          locale={"fr"}
          firstDay={1}
          events={filteredEvents}
          validRange={{
            start: minDate,
          }}
          dayMaxEvents={true}
          displayEventTime={false}
          key={refreshCalendar.toString()}
        />
      </div>
    </div>
  );
};

export default Event;
