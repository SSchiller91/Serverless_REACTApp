import "./searchitem.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {format} from "date-fns";



const SearchItem = () => {

    const location = useLocation();
    const [flightsArray, setFlightsArray] = useState(location.state.flightsArray)
    const [origin, setOrigin] = useState(location.state.origin);
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.Date);
    const [endDate, setEndDate] = useState(location.state.endDate);
    const [options, setOptions] = useState(location.state.options);
    const [people, setPeople] = useState(location.state.people);

    //Calculate full price (price of one seat * number of seats to reserve)
    const calculatePrice = (price, seats) => {
        let final = price * seats;
        return final;
    }
    //open websocket connection and send flight data for booking    
    const executeBooking = () => {

        var W3CWebSocket = require('websocket').w3cwebsocket;
        var client = new W3CWebSocket('wss://3qg2c8eoae.execute-api.eu-central-1.amazonaws.com/production');
        
        var W3CWebSocket = require('websocket').w3cwebsocket;



        client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.send(bookFlight())
        };

        client.onmessage = (message) => {
            console.log(message);
        };
        client.onerror = function() {
            console.log('Connection Error');
        };
 
    //parameters for the flight to book
    function bookFlight() {
            var flight = JSON.stringify({"flightnumber": "23514", "user": "stepesch089", "seats":"2"});
            console.log("sendFlight")
            return flight
    }
    //bookFlight();


        //check if authenticated
        //establish websocket connection
        //loading screen
        //popup if booking was successfull
    }

    return (
        <div className="Flights">
            <table>
                <thead>
                    <tr>
                        <th> Airline</th>
                        <th> Origin</th>
                        <th> Destination</th>
                        <th> Date</th>
                        <th> Flightnumber</th>
                        <th> Price</th>
                        <th>Book</th>
                    </tr>
                </thead>
                <tbody>
                    {flightsArray.map((flight) => (
                        <tr key={flight.FlightNumber}>
                            <td> {flight.Airline}</td>
                            <td > {flight.Origin}</td>
                            <td > {flight.Destination}</td>
                            <td > {flight.CurrentDate}</td>
                            <td > {flight.FlightNumber}</td>
                            <td > {flight.Price}$</td>
                            <td> <button onClick={() => executeBooking()}> Book for: {calculatePrice(flight.Price,people)}$</button></td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            

        </div>

    );
  };
  






  export default SearchItem;