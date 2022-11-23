import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import DrawerNavigation from './src/routers/DrawerNavigation';
import ValidationCheck from './src/routers/ValidationCheck';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import NewBarcodeComponent from './src/components/NewBarcodeComponent';
import ScanItem from './src/pages/ScanItem';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {verified ? (
          <RootStack.Navigator>
            <RootStack.Screen
              name="Main"
              component={DrawerNavigation}
              options={{animationEnabled: false, headerShown: false}}
            />
            <RootStack.Screen
              name="NewBarcodeComponent"
              component={NewBarcodeComponent}
            />
            <RootStack.Screen name="ScanItem" component={ScanItem} />
          </RootStack.Navigator>
        ) : (
          <RootStack.Navigator>
            <RootStack.Screen name="Login" component={ValidationCheck} />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
