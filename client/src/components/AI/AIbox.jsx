import React, { useState } from "react";
import axios from "axios";
import { getAIResponse } from "../../services/aiService";

const AIbox = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    console.log("🔥 CLICKED");

    try {
      const res = await axios.post("http://localhost:8080/ai/generate", {
        prompt: "Hello AI",
      });

      console.log("RESPONSE:", res.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>🧠 AI Assistant</h2>

      <textarea
        rows="4"
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIbox;
