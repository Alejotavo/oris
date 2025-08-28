import axios from "axios";

const API_BASE_URL = "http://localhost:11434/api/generate";

interface OllamaRequest {
  model: string;
  prompt: string;
  stream: boolean;
  response: string;
}

export const getOllamaResponse = async (query: string) => {
  try {
    const response = await axios.post<OllamaRequest>(`${API_BASE_URL}`, {
      model: "gemma:2b",
      prompt: query,
      stream: false,
      response: ""
    });
    console.log("Ollama API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Ollama API response:", error);
    throw error;
  }
};