
import { useEffect } from 'react';
import { useDashboard } from './useDashboard';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function Dashboard() {

const { 
    transcript, 
    listening, 
    resetTranscript 
  } = useSpeechRecognition();

const { 
    responseData, 
    loading, 
    error, 
    setResponseData, 
    handleSend,
  } = useDashboard();


useEffect(() => {
  if (!listening && transcript) {
    handleSend(transcript);
    resetTranscript();
  }
}, [listening]);


  if (loading) { return <div>Loading...</div>;}

  if (error) { return <div>Error: {error}</div>;} 
  
  return (
    <div>
     <h1>Dashboard</h1>
     <p>Response:{responseData}</p>
     <button onClick={() => { setResponseData(null); resetTranscript(); }}>Clear</button>
     <button onClick={() => SpeechRecognition.startListening({ continuous: false, language: 'es-ES' })}>Iniciar</button>
     <p>Transcripción: {transcript}</p>
    </div>
  );
}
export default Dashboard;