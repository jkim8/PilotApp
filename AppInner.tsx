import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import DrawerNavigation from './src/routers/DrawerNavigation';
import ValidationCheck from './src/routers/ValidationCheck';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import NewBarcodeComponent from './src/components/NewBarcodeComponent';
import ScanItem from './src/pages/ScanItem';
import Swipe from './src/pages/Swipe';
import CameraModal from './src/pages/CameraModal';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';

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

function AppInner() {
  const isVerified = useSelector(
    (state: RootState) => !!state.user.validationCode,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {!isVerified ? (
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
            <RootStack.Screen name="Swipe" component={Swipe} />
            <RootStack.Screen
              name="CameraModal"
              component={CameraModal}
              options={{headerShown: false}}
            />
            <RootStack.Screen name="Login" component={ValidationCheck} />
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

export default AppInner;
