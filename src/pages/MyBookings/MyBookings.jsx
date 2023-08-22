import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import { useState } from 'react';
import {useAuthenticator} from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';
import "./mybookings.css";

const MyBookings = () => {
    const [jwtToken, setjwtToken] = useState();
    const { user } = useAuthenticator((context) => [context.user]);
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
    const [bookedflightsArray, setBookedFlightsArray] = useState([])

    const bookingDetails = () => {

    }
    const bookingOperation = (action, flighttoCancel) => {
        if(authStatus === 'authenticated'){
            let jwt;
                Auth.currentSession().then(res=>{
                    let accessToken = res.getAccessToken()
                    jwt = accessToken.getJwtToken()
                    setjwtToken(jwt);
                })
            if(jwtToken != undefined){
                console.log("Token verfügbar")
                var W3CWebSocket = require('websocket').w3cwebsocket;
                var client = new W3CWebSocket('wss://gg96x13vd5.execute-api.eu-central-1.amazonaws.com/production?token="'+jwtToken+'"');
                var W3CWebSocket = require('websocket').w3cwebsocket;
                client.onopen = () => {
                    console.log(action)
                    if(action == 1){
                        console.log("Perform GetBookings")
                        var mybookings = JSON.stringify({"user": user.username, "action":"getBooking"})
                        console.log('WebSocket Client Connected');
                        client.send(mybookings)
                    }else if (action == 0){
                        console.log("Perform CancelBooking")
                        var cancelbooking = JSON.stringify({"user": user.username, "AirlineBookingNumber":flighttoCancel.Airline_BookingNumber, "Internal_ReferenceNumber":flighttoCancel.Internal_ReferenceNumber,"action":"cancelBooking"})
                        console.log(cancelbooking)
                        client.send(cancelbooking)
                    }

                };
                client.onmessage = (message) => {
                    console.log("eskommt eine Nachricht")
                    var parsedmessage = JSON.parse(message.data)
                    console.log(parsedmessage)
                        if(parsedmessage.Payload == "Successfully Canceled"){
                            alert("Your booking was succesfully canceled")
                            console.log("Successfully canceled")
                        }else{
                            setBookedFlightsArray(parsedmessage.Payload.Payload) 
                            console.log(parsedmessage.Payload.Payload) 
                        }
                        

                    


                };
                client.onerror = function() {
                    console.log('Connection Error');
                };
            }
        }   
    }
    
    return (
        <div className="MyBookings">
            <div>
                <Navbar/>
                <Header/>
            </div>
            <button onClick={() => bookingOperation(1,[])}>Click to get your Bookings</button>
            <div className="MyBookings">
                <table>
                    <thead>
                        <tr>
                            <th> AnyTravel Booking Number</th>
                            <th> Airline Booking Number</th>
                            <th> Seats</th>
                            <th> Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedflightsArray.map((flight) => (
                            <tr key={flight.Internal_ReferenceNumber}>
                                <td> {flight.Internal_ReferenceNumber}</td>
                                <td> {flight.Airline_BookingNumber}</td>
                                <td > {flight.Seats}</td>
                                <td > {flight.TotalPrice}</td>
                                <td> <button onClick={() => bookingDetails()}> Booking Details</button></td>
                                <td> <button onClick={() => bookingOperation(0, flight)}> Cancel Booking</button></td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}



export default MyBookings;
