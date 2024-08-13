import React from "react";
/* import Questions from "../Questions/questions"; */

//define the difficulty parameter for each tier
//Easy will have 10 questions and 15 seconds to answer each
//Medium will have 20 questions with 10 seconds to answer each
//Hard will have 40 questions with 5 seconds to answer each
//put each defined difficulty in a button such that on click the questions are being rendered
//I think react router will be very useful here

const Difficulty: React.FC = () => {
  return (
    <>
    <h1>Welcome to Trivia</h1>
    <p>Choose your difficulty level</p>
      <button>Easy</button>
      <button>Medium</button>
      <button>Hard</button>
    </>
  );
};

export default Difficulty;
