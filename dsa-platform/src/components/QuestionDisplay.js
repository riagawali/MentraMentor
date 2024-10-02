// src/components/QuestionDisplay.js
import React, { useState, useEffect } from "react";
import { getQuestions } from "../services/api";

const QuestionDisplay = ({ topic, difficulty }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestions(topic, difficulty);
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, [topic, difficulty]);

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question._id}>
            <h2>{question.question}</h2>
            <p>
              <strong>Example Input:</strong> {question.exampleInput}
            </p>
            <p>
              <strong>Example Output:</strong> {question.exampleOutput}
            </p>
          </div>
        ))
      ) : (
        <p>No questions found for this topic and difficulty level.</p>
      )}
    </div>
  );
};

export default QuestionDisplay;
