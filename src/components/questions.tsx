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
        setCurrentQuestion(
          accessedData[Math.floor(Math.random() * accessedData.length)]
        );
      } catch (error) {
        setIsError(true);
        console.error("Fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /* change this to get next question instead of random question */
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setCurrentQuestion(data[randomIndex]);
  };

  /* creating the shuffle algorithm using Fisher-Yates Shuffle */
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const submittedAnswer = (
      form.elements.namedItem("option") as HTMLInputElement
    ).value;
    /* put a conditional statement that compares submittedAnswer to the correct answer */
    /* create a useState to store correct answer */
    if (submittedAnswer.length !== 0) {
      getRandomQuestion();
    }
    form.reset();

    console.log("working", submittedAnswer);
  };

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && (
        <p>There was an error loading the data. Please try again later.</p>
      )}
      {!isLoading && !isError && currentQuestion && (
        <div>
          <p>{currentQuestion.question}</p>
          <form onSubmit={handleSubmit}>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default Questions;
