import { useState } from "react";
import { getOllamaResponse } from "../services/ollamaApi";


export const useDashboard = () => {   

  const [userInput, setUserInput] = useState("")
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend() {
    
    setLoading(true);
    setError(null);
    try {
      const data = await getOllamaResponse(userInput);
      setResponseData(data.response);
      setUserInput("");
    } catch (err: any) {
      setError(err.message || "Error al obtener la respuesta");
    } finally {
      setLoading(false);
    }
  };

    return {
    responseData,
    setResponseData,
    loading,
    error,
    userInput,
    setUserInput,
    handleSend 
};
}