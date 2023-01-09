import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('백그라운드에서 알람 클릭', remoteMessage.notification);
    return remoteMessage;
  });
};
