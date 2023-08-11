import React from 'react';
import "./flightlist.css";
import Navbar from "../../Components/navbar/Navbar";
import Header from "../../Components/header/Header";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchItem from '../../Components/searchItem/SearchItem';

const FlightList = () => {

    const location = useLocation()
    console.log(location)
    const [origin, setOrigin] = useState(location.state.origin);
    const [destination, setDestination] = useState(location.state.destination);
    const [startDate, setStartDate] = useState(location.state.startDate);
    const [endDate, setEndDate] = useState(location.state.endDate);
    const [options, setOptions] = useState(location.state.options);
    const [flightsArray, setFlightsArray] = useState(location.state.flightsArray)
    
    return (
        <div>
            <Navbar/>    
            <Header/>
            <SearchItem/>
        </div>
    )
}

export default FlightList;