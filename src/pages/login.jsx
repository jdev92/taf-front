import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../components/Sidebar";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (email.trim() === "") {
      newErrors.email = "L'adresse mail est requise";
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email n'est pas valide.";
      isValid = false;
    }

    if (password.length < 4) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 4 caractères.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
        console.log(response);
        handleToken(response.data.authToken);
        // console.log(handleToken);

        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-900 flex justify-center items-center h-screen flex-1 h-screen">
          <div className="bg-gray-800 flex flex-col justify-center p-8 rounded-lg">
            <form
              className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              <h2 className="text-white text-4xl dark:text-white font-bold text-center mb-4">
                Se connecter
              </h2>

              <div className="flex flex-col text-gray-400 py-2">
                <label>Email</label>
                <input
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                  type="text"
                  placeholder="name@example.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <input
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}
              </div>
              <div className="flex justify-between text-gray-400 py-2">
                <p className="flex items-center">
                  <input className="mr-2" type="checkbox" />
                  Se souvenir de moi
                </p>
              </div>
              <button className="w-full my-5 py-2 bg-teal-500 text-white rounded-lg">
                Se connecter
              </button>
              <p className="text-gray-400 py-2" type="submit">
                Mot de passe oublié
              </p>
            </form>
            <Link to={"/signup"}>
              <div className="text-white text-center">
                <p>Vous n'avez pas encore de compte ?</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
