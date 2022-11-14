import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import DrawerNavigation from './src/routers/DrawerNavigation';
import {View} from 'react-native';
import ValidationCheck from './src/routers/ValidationCheck';
import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator();

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
      <NavigationContainer>
        {verified ? (
          <RootStack.Navigator>
            <RootStack.Screen
              name="Main"
              component={DrawerNavigation}
              options={{animationEnabled: false, headerShown: false}}
            />
          </RootStack.Navigator>
        ) : (
          <RootStack.Navigator>
            <RootStack.Screen name="Login" component={ValidationCheck} />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default App;
