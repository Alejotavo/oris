import { useState } from "react";
import { getOllamaResponse } from "../services/ollamaApi";


export const useDashboard = () => {   
 
  const [responseData, setResponseData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

async function handleSend(text: string) {
  const context = `
  Sos un sistema que analiza frases sobre ambientes y luces de una casa en español.
  - Detectá palabras clave de ambientes: "cocina", "living", "dormitorio", "baño", "jardín", etc.
  - Detectá palabras clave de acción o estado: "encendido", "apagado", "on", "off".
  - La frase puede contener múltiples ambientes y estados, separados por comas, "y" u otras conjunciones.
  - Respondé únicamente con un array de strings que combine cada ambiente y su estado, usando formato snake_case. 
    Ejemplos:
      - "La luz de la cocina está encendida" → ["kitchen_on"]
      - "Dormitorio apagado" → ["bedroom_off"]
      - "Living on y dormitorio apagado" → ["living_on", "bedroom_off"]
      - "Living on, dormitorio apagado y jardín encendido" → ["living_on", "bedroom_off", "garden_on"]
  - No agregues explicaciones ni texto extra. Solo devolvé el array.
  `;

  setLoading(true);
  setError(null);

  let arrayResponse: string[] = [];
  let data: any = null;

  try {
    data = await getOllamaResponse(`${context}\n\nPregunta: ${text}`);

    arrayResponse = JSON.parse(data.response);

  } catch (err) {
    console.warn("JSON inválido, fallback aplicado:", err);

    if (data?.response) {
 
      const matches = data.response.match(/"([^"]+)"/g);
      if (matches) {
        arrayResponse = matches.map((s: string) => s.replace(/"/g, '').trim().toLowerCase());
      } else {
        arrayResponse = data.response
          .replace(/[\[\]{}]+/g, '')
          .split(/,|y/)
          .map((s: string) => s.trim().toLowerCase())
          .filter(Boolean);
      }
    }
  } finally {
    setResponseData(arrayResponse);
    setLoading(false);
  }

  console.log("Respuesta procesada:", arrayResponse);
}


  return {
    responseData,
    loading,
    error,
    handleSend 
  };
}