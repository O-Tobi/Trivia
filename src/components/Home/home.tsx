import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ButtonComponent from "./Button";


const Home: React.FC = () => {
  return (
    <>
      <h1>Welcome to Trivia</h1>
      <p>Choose your difficulty level</p>
      <button>
        <NavLink to="easy">Easy</NavLink>
      </button>
      <button>
        <NavLink to="medium">Medium</NavLink>
      </button>
      <button>
        <NavLink to="hard">Hard</NavLink>
      </button>

      <ButtonComponent label="test"/>


      <Outlet />
    </>
  );
};

export default Home;
