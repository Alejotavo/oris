import { useState } from "react";
import { getOllamaResponse } from "../services/ollamaApi";


export const useDashboard = () => {   
 
  const [userVoice, setUserVoice] = useState("")
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend() {
    
    setLoading(true);
    setError(null);
    try {
      const data = await getOllamaResponse(userVoice);
      setResponseData(data.response);
      setUserVoice("");
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
    setUserVoice,
    handleSend 
};
}