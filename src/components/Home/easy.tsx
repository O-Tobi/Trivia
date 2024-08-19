import React from "react";
import Questions from "../Questions/questions";

const Easy: React.FC = () => {
  return (
    <>
      <Questions numberOfQuestions={10} durationForQuestions={20} />
    </>
  );
};

export default Easy;
