import React from "react";
import Questions from "../Questions/questions";

const Medium: React.FC = () => {
  return (
    <>
      <Questions numberOfQuestions={20} durationForQuestions={15} />
    </>
  );
};

export default Medium;