import axios from "axios";

const API = "http://localhost:8080/ai/generate";

export const getAIResponse = async (prompt) => {
  const res = await axios.post(API, { prompt });
  return res.data.data;
};
