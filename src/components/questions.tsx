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
      } catch (error) {

        setIsError(true);
        console.error("Fetching error:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * data.length);

    return data[randomIndex]
  };

  const randomQuestion = getRandomQuestion()

  console.log(data)

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <p>There was an error loading the data. Please try again later.</p>}
      {!isLoading && !isError && data.length > 0 && (

        <div>
            <p>{randomQuestion.question}</p>
        </div>
        
      )}
    </>
  );
};

export default Questions;
