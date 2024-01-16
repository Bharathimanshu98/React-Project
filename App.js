import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from "react-native-config";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './Routes';

export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ServicesContext = React.createContext([]);

const App = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [services, setServices] = useState();

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //     webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //     iosClientId: Config.GOOGLE_IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //   });
  // }, [])

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
     }, [])

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <ServicesContext.Provider value={{ services, setServices }}>
            <Routes />
          </ServicesContext.Provider>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;