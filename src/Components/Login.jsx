import "@aws-amplify/ui-react/styles.css";
import Navbar from "../Components/navbar/Navbar";
import Header from "../Components/header/Header";
import {
  withAuthenticator,
  Authenticator,
  useAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { useNavigate } from 'react-router-dom';


const Login = () => {

    return (
      <div>
        <div className = "LoginContainer">
          <Navbar></Navbar>
          <Header></Header>
        </div>
      </div>
      );
}
export default withAuthenticator(Login);