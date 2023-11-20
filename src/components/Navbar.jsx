import { Link } from "react-router-dom";
import Button from "./Button";

const Nav = () => {
  return (
    <header>
      <div className="shadow-md w-full fixed top-0 left-0 ">
        <div className="md:flex items-center justify-between bg-white py-4">
          <ul className="ml-auto md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in pr-4">
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
            <button className="bg-red-500 text-white py-1 px-6 rounded md:ml-6 hover:bg-red-400 duration-500">
              Déconnexion
            </button>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Nav;
