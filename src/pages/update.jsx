import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    lastName: "",
    firstName: "",
    email: "",
  });
  const [userData, setUserData] = useState({
    lastName: "",
    firstName: "",
    email: "",
  });

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrorMessages = {};
    if (!userData.lastName) {
      newErrorMessages.lastName = "Veuillez renseigner votre nom";
    }
    if (!userData.firstName) {
      newErrorMessages.firstName = "Veuillez renseigner votre prénom";
    }
    if (!userData.email) {
      newErrorMessages.email = "Veuillez renseigner votre email";
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/updateUser/${id}`,
        userData
      );
      console.log("L'utilisateur a été mis à jour avec succès");
      handleShowToast();
      setTimeout(() => {
        navigate("/users");
      }, 3000);
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-900 flex justify-center items-center h-screen flex-1">
          <div className="bg-gray-800 flex flex-col justify-center p-8 rounded-lg">
            {showToast && (
              <div className="px-8 py-6 bg-green-400 text-white flex justify-between rounded">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mr-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <p>Utilisateur a été mis à jour avec suuccès !</p>
                </div>
                <button className="text-green-100 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
            >
              <h2 className="text-white text-4xl dark:text-white font-bold text-center mb-4">
                Modification
              </h2>
              <div className="flex flex-col text-gray-400 py-2">
                <label>Nom</label>
                <input
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                  type="text"
                  placeholder=""
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                />
                <p className="text-red-500">{errorMessages.lastName}</p>
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label>Prénom</label>
                <input
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                  type="text"
                  placeholder=""
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                />
                <p className="text-red-500">{errorMessages.firstName}</p>
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label>Email</label>
                <input
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                  type="text"
                  placeholder="name@example.fr"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <p className="text-red-500">{errorMessages.email}</p>
              </div>

              <button
                className="w-full my-5 py-2 bg-teal-500 text-white rounded-lg"
                type="submit"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
