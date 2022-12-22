import {Alert, Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraModalComponent from '../components/CameraModalComponent';

const Stack = createNativeStackNavigator();

const alert = () => {
  Alert.alert('Notice', '없는 아이템 입니다.', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

function CameraModalMain({navigation}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Camera Modal Component')}>
        <Text style={styles.text}>Open Camera</Text>
      </Pressable>
    </View>
  );
}

function CameraModal(navigation) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CameraModalMain" component={CameraModalMain} />
      <Stack.Screen
        name="Camera Modal Component"
        component={CameraModalComponent}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F9A826',
    width: 200,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CameraModal;
