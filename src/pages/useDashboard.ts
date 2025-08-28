import { useState } from "react";
import { getOllamaResponse } from "../services/ollamaApi";


export const useDashboard = () => {   
 
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSend(text: string) {
    
    const context = `
    Sos un sistema que analiza frases en español.
    - Si el input es una afirmación (ej: "la luz está encendida"), respondé solo con: VERDADERO.
    - Si el input es una negación (ej: "la luz está apagada", "no quiero encender la luz"), respondé solo con: NEGATIVO.
    - No expliques nada más, solo devolvé una palabra.`;

    setLoading(true);
    setError(null);
    try {
      const query = text
      const data = await getOllamaResponse(`${context}\n\nPregunta: ${query}`);
      setResponseData(data.response);

    } catch (err: any) {
      setError(err.message || "Error al obtener la respuesta");
    } finally {
      setLoading(false);
    }
  };

    return {
    responseData,
    loading,
    error,
    handleSend 
};
}