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
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [time, setTime] = useState<number>(10);

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

        console.log("first question: ", accessedData[0]);
        console.log("all question", accessedData);
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
  const getNextQuestion = () => {
    setCurrentQuestion((prevIndex) => (prevIndex + 1) % data.length);
    /* show score here and end the test */
    setTime(10);
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

  const currentQues = data[currentQuestion];
  const correctAns = currentQues?.correctAnswer ?? "";
  const incorrectAns = currentQues?.incorrectAnswers ?? [];

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
      getNextQuestion();
    }

    form.reset();

    console.log("working", submittedAnswer);
  };

  /* create a settimeout here such that once the time runs out, a new question is rendered */
  /* useEffect(() => {
    setTimeout(getNextQuestion, 10000);
  }, [handleSubmit, getNextQuestion]);
 */
  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && (
        <p>There was an error loading the data. Please try again later.</p>
      )}
      {!isLoading && !isError && currentQues && (
        <div>
          <h2>Time: {time}</h2>
          <p>{currentQues.question}</p>
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
