import Login from "./Login";
import {useState} from 'react';

function App(){
  const [isShown, setIsShown] = useState(false);

  const handleLogin = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  return (
    <div className="App">
      <h1>AnyTravel - Your next adventure is just a click away</h1>
      <button onClick={handleLogin}>Login</button>
            {isShown && <Login/> }
      
    </div>
  );
}

export default App;