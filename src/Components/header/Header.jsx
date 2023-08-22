import "./header.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHotel,faHouse, faPlaneCircleCheck} from "@fortawesome/free-solid-svg-icons";
import Flight from "../../pages/flight/Flight";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faHouse} />
                        <span onClick={() => navigate("/")}>Home</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlaneCircleCheck} />
                        <span onClick={() => navigate("/flightsLookup")}>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faHotel} />
                        <span>Hotels</span>
                    </div>
                </div>
                <h1 className="headerTitle"> </h1> 
                <p className="headerDesc">
                    AnyTravel, your next adventure is just a click away
                </p>

            </div>
        </div>
    );
  };
  
  export default Header;