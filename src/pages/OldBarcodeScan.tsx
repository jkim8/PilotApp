import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Camera from './Camera';
import Complete from './Complete';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

function OldBarcodeScan() {
  const [barcode, setBarcode] = useState('');
  const onBarCodeRead = (scanResult: any) => {
    console.log(scanResult);

    // scanResult.data will contain your scanned data
  };

  const onGetItemPress = () => {
    // do something with button press
  };

  const handleChange = () => {
    // handle user input
  };
  return (
    <KeyboardAvoidingView style={styles.root}>
      {' '}
      {/* OR Use a simple <View> instead of <KeyboardAvoidingView> */}
      <View style={styles.upperSection}>
        <RNCamera
          onBarCodeRead={onBarCodeRead}
          // ... other related props of RNCamera
        >
          <BarcodeMask
            width={100}
            height={300}
            showAnimatedLine={false}
            outerMaskOpacity={0.8}
          />
        </RNCamera>
      </View>
      <View style={styles.lowerSection}>
        <View>
          <Icon name="barcode-outline" size={25} />
          <input
            placeholder="Barcode of the item"
            value={barcode}
            onChange={handleChange}
          />
        </View>
        <Pressable onPress={onGetItemPress}>
          <Text>Get Item</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  upperSection: {
    flex: 1,
  },
  lowerSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  camera: {
    height: '100%',
  },
});

export default OldBarcodeScan;
