import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Créer un utilisateur", src: "User", link: "/createUser" },
    { title: "Liste des utilisateurs", src: "User", link: "/users" },
    { title: "Calendar ", src: "Calendar", link: "/calendar" },
    { title: "Planning", src: "Calendar", link: "/allEvents" },
  ];
  return (
    <>
      <div className="flex">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } duration-300 h-screen p-5 pt-8 bg-gray-800 relative`}
        >
          <img
            src="../src/assets/control.png"
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-gray-800 ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
            alt="logo-control"
          />

          <div className="flex gap-x-4 items-center">
            <Link to={"/"}>
              <img
                src="../src/assets/logo.png"
                alt="logo"
                className={`cursor-pointer duration-500`}
              />
            </Link>
            <h1
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              } `}
            >
              Calendar
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <li
                key={index}
                className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-900 rounded-md  ${
                  menu.gap ? "mt-9" : "mt-2"
                } `}
              >
                {/* {menu.title} */}
                <Link to={menu.link} className="flex items-center gap-x-2">
                  <img src={`./src/assets/${menu.src}.png`} alt="" />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200 `}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
