import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchHomePage() {
      const response = await fetch('/api/category');
      const resMessage = await response.json();
      console.log(resMessage);
      setMessage(resMessage.categories[0].name);
    }
    fetchHomePage();
  }, []);

  return (
    <div className="App">
      <p>{message}</p>
    </div>
  );
}

export default App;
