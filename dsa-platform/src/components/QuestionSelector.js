import React, { useState, useEffect } from "react";
import { getQuestions } from "../services/api";
import { Link } from "react-router-dom";
import "./QuestionSelector.css"; // Import custom styles

const QuestionSelector = ({ onSelectQuestion }) => {
  const [topic, setTopic] = useState("Array");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(topic, difficulty); // API call based on topic and difficulty
      console.log("Fetched Questions:", data); // Debugging line to check what is fetched
      if (data.length === 0) {
        setError("No questions found for the selected topic and difficulty");
      } else {
        setError("");
      }
      setQuestions(data);
    };
    fetchQuestions();
  }, [topic, difficulty]);

  return (
    <div className="question-selector">
      <h2>Select a Question</h2>

      {/* Topic Selector */}
      <label>
        Choose Topic:
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="Array">Array</option>
          <option value="String">String</option>
          <option value="Linked List">Linked List</option>
          <option value="Searching Algorithm">Searching Algorithm</option>
          <option value="Sorting Algorithm">Sorting Algorithm</option>
          <option value="Divide and Conquer Algorithm">
            Divide and Conquer Algorithm
          </option>
          <option value="Stack">Stack</option>
          <option value="Queue">Queue</option>
          <option value="Tree Data Structure">Tree Data Structure</option>
          <option value="Graph Data Structure">Graph Data Structure</option>
          <option value="Greedy Methodology">Greedy Methodology</option>
          <option value="Recursion">Recursion</option>
          <option value="Backtracking Algorithm">Backtracking Algorithm</option>
          <option value="Dynamic Programming">Dynamic Programming</option>
        </select>
      </label>

      {/* Difficulty Selector */}
      <label>
        Choose Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>

      {/* Displaying the questions */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="question-list">
        {questions.map((q) => (
          <div
            className={`question-card ${difficulty.toLowerCase()}`}
            key={q._id}
          >
            <h3>{q.name}</h3>
            {/* <p>{q.problemStatement}</p> */}
            <Link
              to="/solve"
              className="solve-btn"
              onClick={() => onSelectQuestion(q)}
            >
              Solve Challenge
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionSelector;
