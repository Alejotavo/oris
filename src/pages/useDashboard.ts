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
      - "Todo encendido" → ["all_on"]
      - "Todo apagado" → ["all_off"]
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

  } finally {
      setResponseData((prev) => {
        let updated = prev ? [...prev] : [];

        for (const cmd of arrayResponse) {
          const [room, state] = cmd.split("_");

          if (room && state) {
            // Eliminar cualquier estado previo de esa misma room
            updated = updated.filter((item) => !item.startsWith(`${room}_`));

            // Agregar el nuevo estado
            updated.push(cmd);
          }
        }
        console.log("Estado actualizado del dashboard:", updated);  
        return updated;
      });

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