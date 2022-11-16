import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OldBarcodeComponent from '../components/OldBarcodeComponent';

const Stack = createNativeStackNavigator();

function ScanButton({navigation}: any) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Old Barcode Scanner')}>
        <View style={styles.buttonContainer}>
          <Icon style={styles.icon} name="camera-outline" size={25} />
          <Text style={styles.text}>Old Barcode Scanner</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

function OldBarcodeScan() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Old Barcode Scan" component={ScanButton} />
      <Stack.Screen
        name="Old Barcode Scanner"
        component={OldBarcodeComponent}
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 280,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3182CE',
    borderRadius: 15,
  },
  icon: {
    color: 'white',
    marginRight: 15,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
});

export default OldBarcodeScan;
