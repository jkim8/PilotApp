import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import DrawerNavigation from './src/routers/DrawerNavigation';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  BarcodeScan: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
};

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}

export default App;
