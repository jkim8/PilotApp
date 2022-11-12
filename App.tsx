import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import DrawerNavigation from './src/routers/DrawerNavigation';
import {View} from 'react-native';
import ValidationCheck from './src/pages/ValidationCheck';

export type LoggedInParamList = {
  Orders: undefined;
  OrderDetail: undefined;
  Settings: undefined;
  BarcodeScan: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
};

function App() {
  const [verified, setVerified] = useState(true);
  return (
    <>
      {verified ? (
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      ) : (
        <ValidationCheck />
      )}
    </>
  );
}

export default App;
