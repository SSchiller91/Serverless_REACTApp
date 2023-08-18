import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import FlightList from "./pages/list/FlightList";
import Flight from "./pages/flight/Flight";
import Login from "./Components/Login";

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/flights" element= {<FlightList/>}/>
        <Route path="/flights/:id" element= {<Flight/>}/>
        <Route path="/login" element= {<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;