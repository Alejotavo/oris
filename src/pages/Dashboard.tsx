import { useDashboard } from './useDashboard';

function Dashboard() {

  const { 
    responseData, 
    loading, 
    error, 
    userInput, 
    setResponseData, 
    setUserInput, 
    handleSend 
  } = useDashboard();


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