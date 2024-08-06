import React, { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface DataItem {
  id: string; 
  question: string;
  correctAnswer: string;
  incorrectAnswers: string;
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

 
  let correctAns = currentQuestion?.correctAnswer ?? "";
  let incorrectAns = currentQuestion?.incorrectAnswers ?? [];

  const options = [correctAns, ...incorrectAns];

    console.log("options: ", options)

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <p>There was an error loading the data. Please try again later.</p>}
      {!isLoading && !isError && currentQuestion && (
        <div>
          <p>{currentQuestion.question}</p>
          <p>{currentQuestion.correctAnswer}</p>
          <button onClick={getRandomQuestion}>Next</button>
        </div>
      )}
    </>
  );
};

export default Questions;
