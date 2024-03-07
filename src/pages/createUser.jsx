import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const CreateUser = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (lastName.trim() === "") {
      newErrors.lastName = "Veuillez renseigner votre Nom";
      isValid = false;
    }

    if (firstName.trim() === "") {
      newErrors.firstName = "Veuillez renseigner votre Prénom";
      isValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Veuillez renseigner votre email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email non valide !";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/createUser", {
          lastName,
          firstName,
          email,
        });
        console.log(response);
        setErrors({});
        console.log("Utilisateur enregistré avec succès!");
        handleShowToast();
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
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
                <p>Utilisateur enregistrer avec suuccès !</p>
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
            className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg relative"
            onSubmit={handleSubmit}
          >
            <h2 className="text-white text-4xl dark:text-white font-bold text-center mb-4">
              Créer un utilisateur
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="lastName">Nom</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <div key="lastName-error" className="text-red-500">
                  {errors.lastName}
                </div>
              )}
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="firstName">Prénom</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder=""
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName}</div>
              )}
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="email">Email</label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>

            <button
              className="w-full my-5 py-2 bg-teal-500 text-white rounded-lg"
              type="submit"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
