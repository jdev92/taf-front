const Button = (props) => {
  return (
    <button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-1 px-6 rounded md:ml-6 hover:bg-teal-400 duration-500">
      {props.children}
    </button>
  );
};

export default Button;
