import React, { useEffect } from 'react';
import "./flight.css";
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/navbar/Navbar';
import Header from '../../Components/header/Header';

const  Flight =  () => {
    //Destination and Origin
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    //Dates for the start and return
    const [date, setDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    //choosing how many people
    const [openOptions, setOpenOptions] = useState (false)
    const [people, setOptions] = useState(1);
    //the array where the API Call response is saved
    const [flightsArray, setFlightsArray] = useState();
    //if state of flightsArray changes, move to next page 
    const [allowNext, setAllowNext] = useState(false);
    

    useEffect(() => {
        handleSearch()
      }, [allowNext])
    //navigate to next Page
    const navigate = useNavigate();

    const getData =  () => {
        var url = " https://s9arg0j5a0.execute-api.eu-central-1.amazonaws.com/dev/getflights";
        var data = JSON.stringify({
            "origin": origin,
            "destination": destination,
            "seats": people,
            "date": date
          });
    
        return fetch(url, {
            method: 'post', // Default is 'get'
            body: data,
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })
          .then(response => response.json())
          .then(json => setFlightsArray (json))
          .then(() => setAllowNext(true))
        }

    //increase/decrease people option
    function handleOption(operation){
        if(operation == "increase"){
            setOptions(people+1);
        }else{setOptions(people-1)};
    };        
    //When clicking on the Search Button navigate to flight page and hand over state and perform API Call
    const handleSearch = () =>{
        if(allowNext === true){
            navigate ("/flights", {state: {origin, destination, date, people, flightsArray}})
            console.log("Hier sind deine Flüge")
            console.log(flightsArray);
        }
        return
    }
    
    
    return (
        <div>
            <Navbar/>
            <Header/> 
        <div className='headerSearch'>
            <div className="headerSearchItem">
                <input onChange={e =>setOrigin(e.target.value) } type="text" placeholder='Origin' className='headerSearchInput'/>
            </div>
            <div className="headerSearchItem">
                <input onChange={e =>setDestination(e.target.value) }type="text" placeholder="Where are you going?"className='headerSearchInput'/>
            </div>
            <div className="headerSearchItem">
                <span className='headerSearchText'>Start </span>
                <DatePicker  selected ={date} onChange={(date) => setDate(date)}/>
            </div>
            <div className="headerSearchItem">
                <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{people} person</span>
                {openOptions && < div className='options'>
                    <div className='optionItem'>
                        <span className='optionText'>Person</span>
                        <div className="optionCounter">
                            <button className='optionCounterButton' onClick={() => handleOption("decrease")}>-</button>
                            <span className='optionCounterNumber' >{people}</span>
                            <button className='optionCounterButton' onClick={() => handleOption("increase")}>+</button>
                        </div>
                    </div>
                </div>}
            </div> 
            <div className="headerSearchItem">
                <button className='headerBtn' onClick={() => getData() }>Search</button>
            </div>
        </div>
        </div>
    )
}

export default Flight