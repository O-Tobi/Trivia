import React, { useState, useEffect, useCallback } from "react";

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
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(10);

  // Shuffle array function using Fisher-Yates Algorithm
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffling the options
  const getShuffledOptions = (question: DataItem) => {
    if (!question) return [];
    const correctAns = question.correctAnswer;
    const incorrectAns = question.incorrectAnswers;
    return shuffleArray([correctAns, ...incorrectAns]);
  };

  // Get next Question
  const getNextQuestion = useCallback(() => {
    setCurrentQuestion((prevIndex) => {
      const nextIndex = (prevIndex + 1) % data.length;
      setOptions(getShuffledOptions(data[nextIndex]));
      setTime(10);
      return nextIndex;
    });
  }, [data]);

  const currentQues = data[currentQuestion];

  // Timer and Interval for question timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      getNextQuestion();
      setTotalQuestions((prevState) => prevState - 1);
    }, 10000);

    const interval = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentQuestion, getNextQuestion]);

  // Fetching data from the EndPoint
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
        setOptions(getShuffledOptions(accessedData[0]));
      } catch (error) {
        setIsError(true);
        console.error("Fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handling form submission and Score Checker
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const submittedAnswer = (
      form.elements.namedItem("option") as HTMLInputElement
    ).value;
    const rightAns = currentQues.correctAnswer;

    if (submittedAnswer === rightAns) {
      setScore((prevState) => prevState + 1);
      getNextQuestion();
      setTotalQuestions((prevState) => prevState - 1);
    } else if (submittedAnswer.length !== 0) {
      getNextQuestion();
      setTotalQuestions((prevState) => prevState - 1);
    }

    form.reset();
    console.log("Selected answer:", submittedAnswer);
  };

  const finalScore = (score / 10) * 100;

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && (
        <p>There was an error loading the data. Please try again later.</p>
      )}
      {!isLoading && !isError && currentQues && totalQuestions > 0 && (
        <div>
          <h2>Time: {time}</h2>
          <h3>Total Questions: {totalQuestions}</h3>
          <h3>Score: {score}</h3>
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

      {!isLoading && !isError && totalQuestions === 0 && (
        <h1>You score: {finalScore}%</h1>
      )}
    </>
  );
};

export default Questions;


// in creating difficulty, pass the limit of questions as props
//pass the time constraint also as prop
//export the question component into a difficulty component
// if any level is selected then than should influence the number of questions and the time required to answer each question
