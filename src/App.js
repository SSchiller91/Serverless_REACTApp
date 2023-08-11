import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import FlightList from "./pages/list/FlightList";
import Flight from "./pages/flight/Flight";

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/flights" element= {<FlightList/>}/>
        <Route path="/flights/:id" element= {<Flight/>}/>
      </Routes>
    </BrowserRouter>
    /*<div className="App">

      <h1>AnyTravel - Your next adventure is just a click away</h1>
      <button onClick={handleLogin}>Login</button>
        {isShown && <Login/> }
    </div>*/
  );
}

export default App;