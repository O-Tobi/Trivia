import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface DataItem {
  id: string; 
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  category: string;
}

const Questions: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<DataItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}?limit=5`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const accessedData = await response.json();
        setData(accessedData);
        /* set precedence with the first random question */
        setCurrentQuestion(accessedData[Math.floor(Math.random() * accessedData.length)]);
      } catch (error) {
        setIsError(true);
        console.error("Fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setCurrentQuestion(data[randomIndex]);
  };


  /* creating a shuffling algorithm using Fisher-Yates Shuffle */
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const shuffled = [...arr]; 
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    return shuffled;
  };

  const correctAns = currentQuestion?.correctAnswer ?? "";
  const incorrectAns = currentQuestion?.incorrectAnswers ?? [];

  const options = shuffleArray([correctAns, ...incorrectAns]);
  console.log("options: ", options)
  console.log("correct answer: ", correctAns)

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <p>There was an error loading the data. Please try again later.</p>}
      {!isLoading && !isError && currentQuestion && (
        <div>
          <p>{currentQuestion.question}</p>
          
          <button onClick={getRandomQuestion}>Next</button>
        </div>
      )}
    </>
  );
};

export default Questions;
