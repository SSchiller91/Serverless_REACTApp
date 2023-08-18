import "./searchitem.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {format} from "date-fns";
import React, { Component } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const SearchItem = () => {

    const location = useLocation();
    const [flightsArray, setFlightsArray] = useState(location.state.flightsArray)
    const [origin, setOrigin] = useState(location.state.origin);
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.Date);
    const [endDate, setEndDate] = useState(location.state.endDate);
    const [options, setOptions] = useState(location.state.options);
    const [people, setPeople] = useState(location.state.people);
    const { user } = useAuthenticator((context) => [context.user]);
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
    const navigate = useNavigate();
    const [jwtToken, setjwtToken] = useState();
    //Calculate full price (price of one seat * number of seats to reserve)
    const calculatePrice = (price, seats) => {
        let final = price * seats;
        return final;
    }
    const getToken = () => {
        let jwt;
        Auth.currentSession().then(res=>{
          let accessToken = res.getAccessToken()
           jwt = accessToken.getJwtToken()
          console.log("Your JWT Token: " + jwt);
          setjwtToken(jwt);
        })
        return jwt;
      }
    //open websocket connection and send flight data for booking    
    
    const executeBooking = (selectedFlightNumber) => {
        if(authStatus === 'authenticated'){
            let jwt;
            Auth.currentSession().then(res=>{
                let accessToken = res.getAccessToken()
                jwt = accessToken.getJwtToken()
                setjwtToken(jwt);
            })
            if(jwtToken != undefined){
                console.log("Token verfügbar")
                console.log (jwtToken);
            var W3CWebSocket = require('websocket').w3cwebsocket;
            var client = new W3CWebSocket('wss://gg96x13vd5.execute-api.eu-central-1.amazonaws.com/production?token="'+jwtToken+'"');
            var W3CWebSocket = require('websocket').w3cwebsocket;
            
                client.onopen = () => {
                    console.log('WebSocket Client Connected');
                    client.send(bookFlight(selectedFlightNumber))
                };
                client.onmessage = (message) => {
                    var parsedmessage = JSON.parse(message.data)
                    if(parsedmessage.Payload == "Booking successful"){
                        alert("Deine Buchung war erfolgreich. Du solltest innerhalb von 24h eine Bestätigungsmail erhalten")
                    }
                };
                client.onerror = function() {
                    console.log('Connection Error');
                };
                function bookFlight(selectedflight) {
                    console.log("das ist der ausgewaählte flug:")
                    console.log(selectedflight);
                    console.log(user.username)
                        var flight = JSON.stringify({"flightnumber": selectedflight, "user": user.username, "seats":people, "action":"connect"});
                        console.log("bookFlight")
                        return flight
                }
            }else{
                alert("Token undefined")
            }
        }else{
            alert("You are not signed in. Please sign in or sign up for free")
        }
    }
  return (
        <div className="Flights">
            <div className="Flights">
                <button onClick={() => getToken()}> Token</button>
            </div>
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
                            <td> <button onClick={() => executeBooking(flight.FlightNumber)}> Total Price: {calculatePrice(flight.Price,people)}$</button></td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            

        </div>

    );
  };
  






  export default SearchItem;