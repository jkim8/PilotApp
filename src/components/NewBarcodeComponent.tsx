import {useEffect, useState} from 'react';
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
import BarcodeMask from 'react-native-barcode-mask';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

function NewBarcodeComponent() {
  const [barcode, setBarcode] = useState('');
  const [shouldReadBarcode, setShouldReadBarcode] = useState(true);
  const isFocused = useIsFocused();

  const WIDTH = Dimensions.get('window').width;

  const onBarCodeRead = e => {
    setBarcode(e.data);
    console.log(e.data);
  };

  useEffect(() => {
    if (isFocused) {
      console.log('New Focused!!');
    }
  }, [isFocused]);

  useEffect(() => {
    toggleActiveState();
    return () => {
      barcode;
    };
  }, [barcode]);

  const toggleActiveState = () => {
    if (barcode && barcode.length > 0 && shouldReadBarcode === true) {
      setShouldReadBarcode(false);

      if (barcode !== '') {
        Alert.alert('Barcode Scanned', `Barcode: ${barcode}`, [
          {
            text: 'Reset',
            onPress: () => resetBarcod(),
            style: 'default',
          },
        ]);
      }
    }
  };

  const resetBarcod = () => {
    setBarcode('');
    this.scanner.reactivate();
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
      <View style={styles.upperSection}>
        <QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          cameraStyle={{height: '100%'}}
          showMarker={false}
          fadeIn={false}
          markerStyle={{
            borderColor: 'white',
            height: 80,
            width: WIDTH,
          }}
          onRead={onBarCodeRead}
          reactivate={shouldReadBarcode}
          flashMode={RNCamera.Constants.FlashMode.auto}
        />

        <BarcodeMask
          width={WIDTH}
          height={80}
          showAnimatedLine={false}
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

export default NewBarcodeComponent;
