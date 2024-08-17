import React from "react";
import Questions from "../Questions/questions";

const Hard: React.FC = () => {
  return (
    <>
      <Questions numberOfQuestions={40} durationForQuestions={10} />
    </>
  );
};

export default Hard;
