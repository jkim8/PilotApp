import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';

function CameraModalComponent({navigation}: any) {
  const [barcode, setBarcode] = useState('');
  const [shouldReadBarcode, setShouldReadBarcode] = useState(true);
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const WIDTH = Dimensions.get('window').width;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
    // setModalVisible(false);
    // setTimeout(() => {
    //   setSecondModalVisible(!isSecondModalVisible);
    // }, 600);
  };
  const secondModalClose = () => {
    setSecondModalVisible(false);

    setTimeout(() => {
      setModalVisible(true);
    }, 600);
  };

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
            onPress: () => toggleModal(),
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
        {/* <View>
          <Icon name="barcode-outline" size={25} />
          <TextInput
            placeholder="Barcode of the item"
            value={barcode}
            onChange={handleChange}
          />
        </View> */}
        <Pressable style={styles.button} onPress={toggleModal}>
          <Text style={styles.BtnText}>Open Modal</Text>
        </Pressable>

        {/* <Pressable onPress={onGetItemPress}>
          <Text>Order</Text>
        </Pressable> */}
      </View>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.imageBox}>
              <Image
                style={styles.image}
                source={require('../assets/item.jpg')}
              />
              <View style={styles.imageText}>
                <Text style={{fontWeight: '700'}}>Sun SSC Wax</Text>
                <Text style={{textAlign: 'right', color: 'red'}}>$20</Text>
              </View>
            </View>

            <Pressable style={styles.button} onPress={toggleSecondModal}>
              <Text style={styles.BtnText}>모달 위 모달</Text>
            </Pressable>
            <Pressable style={styles.closeBtn} onPress={toggleModal}>
              <Text style={styles.BtnText}>Close</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          isVisible={isSecondModalVisible}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={1000}
          animationOutTiming={800}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={500}>
          <View style={styles.secondModal}>
            <View>
              <View />
              <Text>Second Modal</Text>
              <Button title="close" onPress={secondModalClose} />
            </View>
          </View>
        </Modal>
      </Modal>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  camera: {
    height: '100%',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 300,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  secondModal: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 20,
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
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#E96363',
    width: 200,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  BtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageBox: {
    flexDirection: 'row',
    width: 300,
    height: 120,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  image: {
    margin: 10,
    height: 100,
    width: 100,
    marginBottom: 20,
    marginRight: 50,
  },
  imageText: {
    justifyContent: 'center',
  },
});

export default CameraModalComponent;
