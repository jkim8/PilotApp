import React, {useEffect, useState} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './src/store/reducer';
import messaging from '@react-native-firebase/messaging';
import {setPushNotificationModal} from './src/slices/user';
import {requestUserPermission} from './pushnotification';

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
  const dispatch = useDispatch();
  //앱이 켜진 상태 일 때
  messaging().onMessage(async remoteMessage => {
    dispatch(setPushNotificationModal(remoteMessage.notification));
  });
  //앱이 백그라운드 상태 일때
  messaging().onNotificationOpenedApp(async remoteMessage => {
    dispatch(setPushNotificationModal(remoteMessage.notification));
  });

  //앱이 꺼진 상태 일 때
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        dispatch(setPushNotificationModal(remoteMessage.notification));
      }
    });

  const [isLoggedIn, setLoggedIn] = useState(false);
  const isVerified = useSelector((state: RootState) => state.user.verified);

  useEffect(() => {
    if (isVerified === true) {
      setLoggedIn(true);
    }
  }, [isVerified, isLoggedIn]);

  useEffect(() => {
    requestUserPermission();
  }, []);

  // // 토큰 설정
  // useEffect(() => {
  //   async function getToken() {
  //     try {
  //       if (!messaging().isDeviceRegisteredForRemoteMessages) {
  //         await messaging().registerDeviceForRemoteMessages();
  //       }
  //       const token = await messaging().getToken();
  //       console.log('phone token', token);
  //       dispatch(userSlice.actions.setPhoneToken(token));
  //       // return axios.post(`${API_URL}/phonetoken`, {token});
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getToken();
  // }, [dispatch]);

  return isLoggedIn ? (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
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
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  ) : (
    <ValidationCheck />
  );
}

export default AppInner;
