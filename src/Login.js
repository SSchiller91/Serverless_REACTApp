import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';

const Login = ({signOut}) => {
    return (
        <View className="Login">
          <Card>
            <Heading level={1}>You are signed in</Heading>
          </Card>
          <Button onClick={signOut}>Sign Out</Button>
        </View>
      );
}

export default withAuthenticator(Login);