import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionSelector from "./components/QuestionSelector";
import CodeEditor from "./components/CodeEditor";
import { getSocraticFeedback } from "./services/api";
import "./App.css";

function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(
    JSON.parse(localStorage.getItem("selectedQuestion")) || null
  );
  const [feedback, setFeedback] = useState("");

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    localStorage.setItem("selectedQuestion", JSON.stringify(question));
  };

  const handleSubmitCode = async (code) => {
    if (selectedQuestion) {
      try {
        const response = await getSocraticFeedback(code, selectedQuestion.name);
        setFeedback(response.feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1>DSA Practice Platform</h1>
        <Routes>
          <Route
            path="/"
            element={
              <QuestionSelector onSelectQuestion={handleSelectQuestion} />
            }
          />
          <Route
            path="/solve"
            element={
              selectedQuestion ? (
                <div className="problem-editor-container">
                  <div className="problem-statement">
                    <h2>{selectedQuestion.name}</h2>
                    <p>{selectedQuestion.problemStatement}</p>
                    {selectedQuestion.examples &&
                      selectedQuestion.examples.length > 0 && (
                        <div>
                          {selectedQuestion.examples.map((example, index) => (
                            <div key={index}>
                              <p>
                                <strong>Example {index + 1} Input:</strong>{" "}
                                {example.input}
                              </p>
                              <p>
                                <strong>Example {index + 1} Output:</strong>{" "}
                                {example.output}
                              </p>
                              <p>
                                <strong>Explanation:</strong>{" "}
                                {example.explanation}
                              </p>
                              <hr />
                            </div>
                          ))}
                        </div>
                      )}
                    <p>
                      <strong>Time Complexity:</strong>{" "}
                      {selectedQuestion.timeComplexity}
                    </p>
                    <p>
                      <strong>Space Complexity:</strong>{" "}
                      {selectedQuestion.spaceComplexity}
                    </p>
                    <p>
                      <strong>Constraints:</strong>{" "}
                      {selectedQuestion.constraints}
                    </p>
                  </div>

                  <div className="code-editor-container">
                    <CodeEditor
                      language="javascript"
                      onSubmit={handleSubmitCode}
                    />
                    {feedback && (
                      <div className="feedback-container">
                        <h3>Socratic Feedback</h3>
                        <p>{feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p>No question selected.</p>
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
