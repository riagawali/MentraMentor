import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { FaCopy, FaRedo, FaDownload, FaExpand } from "react-icons/fa"; // Import the fullscreen icon

const CodeEditor = ({ question }) => {
  const [code, setCode] = useState(""); // State to store the code
  const [language, setLanguage] = useState("javascript"); // State to store the selected language
  const [feedback, setFeedback] = useState(""); // State to store feedback
  const [error, setError] = useState(""); // State to store errors
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state

  const handleRunCode = async () => {
    // Your logic to run the code and get feedback
  };

  // Function to handle language change from the dropdown
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Update the selected language
  };

  // Function to handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={isFullscreen ? "fullscreen-editor" : ""}>
      {/* Toolbar for the editor */}
      <div className="editor-toolbar">
        {/* Dropdown for selecting language */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="language-selector"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          {/* Add more languages as needed */}
        </select>

        {/* Icons for copy, reset, download, and fullscreen */}
        <div className="toolbar-icons">
          <button title="Copy Code" className="toolbar-btn">
            <FaCopy />
          </button>
          <button
            title="Reset Code"
            onClick={() => setCode("// Write your code here")}
            className="toolbar-btn"
          >
            <FaRedo />
          </button>
          <button title="Download Code" className="toolbar-btn">
            <FaDownload />
          </button>
          <button
            title="Fullscreen"
            onClick={handleFullscreenToggle}
            className="toolbar-btn"
          >
            <FaExpand />
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <Editor
        height={isFullscreen ? "90vh" : "400px"} // Adjust height for fullscreen
        language={language} // Set the language dynamically based on user selection
        defaultValue="// Write your code here"
        value={code}
        onChange={(value) => setCode(value)} // Update the code state on change
      />

      {/* Button to run code */}
      <button onClick={handleRunCode} className="get-feedback-button">
        Get Feedback
      </button>

      {/* Display Errors */}
      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p> {/* Display error messages */}
        </div>
      )}

      {/* Display Socratic Feedback */}
      {feedback && (
        <div>
          <h3>Socratic Feedback</h3>
          <p>{feedback}</p> {/* Display feedback */}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
