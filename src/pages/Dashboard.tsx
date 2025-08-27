import { useState } from 'react';
import { getOllamaResponse } from '../services/ollamaApi'



function Dashboard() {

  const [userInput, setUserInput] = useState("")
  const [responseData, setResponseData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOllamaResponse(userInput);
      setResponseData(data.response);
    } catch (err: any) {
      setError(err.message || "Error al obtener la respuesta");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  } 
  
  return (
    <div>
      <h1>Dashboard</h1>

     <input type="text" 
        placeholder="Type your message here..." 
        name='userInput' value={userInput} 
        onChange={e => setUserInput(e.target.value)} 
        />
     <button onClick={handleSend}>Send</button>
     <p>{responseData}</p>
     <button onClick={() => setResponseData(null)}>Clear</button>
    </div>
  );
}
export default Dashboard;