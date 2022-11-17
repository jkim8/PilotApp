import {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

function NewBarcodeComponent() {
  const [barcode, setBarcode] = useState('');
  const [shouldReadBarcode, setShouldReadBarcode] = useState(true);

  // const devices = useCameraDevices();
  // const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes([
  //   BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
  // ]);

  // const [barcode, setBarcode] = useState('');
  // const [hasPermission, setHasPermission] = useState(false);
  // const [isScanned, setIsScanned] = useState(false);

  // useEffect(() => {
  //   checkCameraPermission();
  // }, []);

  // const checkCameraPermission = async () => {
  //   const status = await Camera.getCameraPermissionStatus();
  //   setHasPermission(status === 'authorized');
  // };

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;

  // useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     setHasPermission(status === 'authorized');
  //   })();
  // }, []);

  // return (
  //   device != null &&
  //   hasPermission && (
  //     <View style={styles.container}>
  //       {Platform.OS === 'android' && (
  //         <View
  //           style={{zIndex: 99, position: 'absolute', top: '50%', left: '50%'}}>
  //           <BarcodeMask
  //             width={WIDTH}
  //             height={80}
  //             showAnimatedLine={true}
  //             outerMaskOpacity={0.7}
  //           />
  //         </View>
  //       )}
  //       <Camera
  //         style={StyleSheet.absoluteFill}
  //         device={device}
  //         isActive={!isScanned}
  //         frameProcessor={frameProcessor}
  //         frameProcessorFps={5}
  //         children={
  //           Platform.OS === 'ios' && (
  //             <BarcodeMask
  //               width={WIDTH}
  //               height={80}
  //               showAnimatedLine={true}
  //               outerMaskOpacity={0.7}
  //             />
  //           )
  //         }
  //       />
  //     </View>
  //   )
  // );

  const onBarCodeRead = e => {
    setBarcode(e.data);
    console.log(e.data);
    // setShouldReadBarcode(false);
    // if (barcode) {
    //   Alert.alert('Barcode Scanned', `Barcode: ${barcode}`, [
    //     {
    //       text: 'Reset',
    //       onPress: () => resetBarcod(),
    //       style: 'default',
    //     },
    //   ]);
    // }
  };

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
    setShouldReadBarcode(true);
    this.scanner.reactivate();
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
          cameraStyle={{height: HEIGHT / 1.5}}
          showMarker={true}
          markerStyle={{
            borderColor: 'white',
            height: 80,
            width: WIDTH - 20,
          }}
          onRead={onBarCodeRead}
          reactivate={shouldReadBarcode}
          flashMode={RNCamera.Constants.FlashMode.auto}
        />
        <BarcodeMask
          width={WIDTH}
          height={80}
          showAnimatedLine={true}
          outerMaskOpacity={0.7}
        />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: '#000',
//     //paddingVertical: 50,
//   },
// });

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
