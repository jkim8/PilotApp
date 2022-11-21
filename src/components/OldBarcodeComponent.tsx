import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

function OldBarcodeComponent() {
  const [barcode, setBarcode] = useState('');
  const [shouldReadBarcode, setShouldReadBarcode] = useState(true);
  const isFocused = useIsFocused();
  const WIDTH = Dimensions.get('window').width;

  useEffect(() => {
    if (isFocused) {
      console.log('Old Focused!!');
    }
  }, [isFocused]);

  const onBarCodeRead = (scanResult: any) => {
    console.log(scanResult);
    console.log(scanResult.data);
    setBarcode(scanResult.data);

    if (barcode) {
      Alert.alert('Barcode Scanned', `Barcode: ${barcode}`, [
        {
          text: 'Reset',
          onPress: () => resetBarcod(),
          style: 'default',
        },
      ]);
      setShouldReadBarcode(false);
    }
  };

  const resetBarcod = () => {
    setBarcode('');
    setShouldReadBarcode(true);
  };

  const onGetItemPress = () => {
    // do something with button press
  };

  const handleChange = () => {
    // handle user input
  };
  return (
    <KeyboardAvoidingView style={styles.root}>
      {/* OR Use a simple <View> instead of <KeyboardAvoidingView> */}
      <View style={styles.upperSection}>
        <RNCamera
          captureAudio={false}
          style={{flex: 1}}
          onBarCodeRead={shouldReadBarcode === true ? onBarCodeRead : undefined}
          flashMode={RNCamera.Constants.FlashMode.on}>
          <BarcodeMask
            showAnimatedLine={false}
            width={WIDTH}
            height={80}
            outerMaskOpacity={0.7}
          />
          <View
            style={{
              flex: 1,
              height: 1,
              borderColor: 'white',
              borderBottomWidth: 2,
              borderBottomColor: 'White',
              position: 'absolute',
              zIndex: 0,
              top: '50%',
            }}>
            <Text style={{width: WIDTH}} />
          </View>
        </RNCamera>
      </View>
      <View style={styles.lowerSection}>
        <View>
          <Icon name="barcode-outline" size={25} />
          <TextInput
            placeholder="Barcode of the item"
            value={barcode}
            onChange={handleChange}
          />
        </View>
        <Pressable onPress={onGetItemPress}>
          <Text>Order</Text>
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

export default OldBarcodeComponent;
