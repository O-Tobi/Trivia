import React from "react";


//I think react router will be very useful here

const Home: React.FC = () => {
  return (
    <>
    <h1>Welcome to Trivia</h1>
    <p>Choose your difficulty level</p>
      <button>Easy</button> 
      <button>Medium</button>
      <button>Hard</button>
    </>
    //route each button to their corresponding page using react router
  );
};

export default Home;
