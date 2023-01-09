import {useEffect, useState} from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useDispatch} from 'react-redux';
import {setResetPushNotification} from '../slices/user';

function Home() {
  const DeviceId = deviceInfoModule.getDeviceId();
  const DeviceType = deviceInfoModule.getDeviceType();
  const DeviceSystemVersion = deviceInfoModule.getSystemVersion();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPushModalVisible, setPushModalVisible] = useState(false);
  const [DeviceIp, serDeviceIp] = useState('');

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closePushModal = () => {
    dispatch(setResetPushNotification());
    setPushModalVisible(false);
  };

  const pushModalTitle = useSelector(
    (state: RootState) => state.user.pushModalTitle,
  );
  const pushModalBody = useSelector(
    (state: RootState) => state.user.pushModalBody,
  );

  useEffect(() => {
    deviceInfoModule.getUniqueId().then(ip => {
      serDeviceIp(ip);
      if (pushModalTitle !== '') {
        setPushModalVisible(true);
      }
    });
  }, [pushModalTitle]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/new.jpeg')}
        resizeMode="cover"
        style={styles.background}>
        <TouchableOpacity style={styles.openModalBox} onPress={toggleModal}>
          <Text style={styles.openModalText}>Device Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => {
            Linking.openURL('https://www.sunssc.com/global/pilot/');
          }}>
          <Text style={styles.text}>App update link</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.deviceInfoTextBox}>
            <Text style={styles.deviceInfoTitleText}>Device ID:</Text>
            <Text style={styles.deviceInfoText}> {DeviceId}</Text>
          </View>
          <View style={styles.deviceInfoTextBox}>
            <Text style={styles.deviceInfoTitleText}>Device Type:</Text>
            <Text style={styles.deviceInfoText}> {DeviceType}</Text>
          </View>
          <View style={styles.deviceInfoTextBox}>
            <Text style={styles.deviceInfoTitleText}>
              Device System Version:
            </Text>
            <Text style={styles.deviceInfoText}> {DeviceSystemVersion}</Text>
          </View>
          <View style={styles.deviceInfoTextBox}>
            <Text style={styles.deviceInfoTitleText}>Unique ID:</Text>
            <Text style={styles.deviceInfoText}>{DeviceIp}</Text>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isPushModalVisible}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        onSwipeComplete={() => setPushModalVisible(false)}
        swipeDirection="left">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              width: 300,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '700', marginBottom: 20}}>
              {pushModalTitle}
            </Text>
            <Text>{pushModalBody}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={closePushModal}>
              <Text style={styles.closeBtnText}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#307bf2',
    fontSize: 16,
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  deviceInfo: {
    backgroundColor: 'white',
    color: '#307bf2',
    fontSize: 16,
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  deviceInfoTextBox: {
    flexDirection: 'row',
    width: 350,
    marginBottom: 10,
  },
  deviceInfoTitleText: {width: 170},
  deviceInfoText: {textAlign: 'right', width: 180},
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    marginTop: 50,
  },
  closeBtnText: {
    color: 'white',
    fontWeight: '700',
  },
  openModalBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 200,
    height: 50,
    backgroundColor: '#3182CE',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: '50%',
  },
  openModalText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Home;
