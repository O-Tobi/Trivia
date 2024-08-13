import React from "react";
import Questions from "../Questions/questions";

const Difficulty: React.FC = () => {
    return(
        <>
            <Questions 
            numberOfQuestions={5}
            durationForQuestions={10000}/>
        </>
    );
}

export default Difficulty;