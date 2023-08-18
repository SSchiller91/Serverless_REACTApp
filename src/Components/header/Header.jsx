import "./header.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHotel, faPlaneCircleCheck} from "@fortawesome/free-solid-svg-icons";
import Flight from "../../pages/flight/Flight";

const Header = () => {
    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faPlaneCircleCheck} />
                        <span>Flights</span>
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
                    <div className="headerSearchItem">
                        <Flight/>
                    </div>
            </div>
        </div>
    );
  };
  
  export default Header;