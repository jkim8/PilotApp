import {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

function Settings() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={isModalVisible ? styles.modalBackgraound : styles.container}>
      <Modal
        style={styles.bottomModalView}
        visible={isModalVisible}
        animationType={'slide'}
        transparent={true}>
        <View style={styles.modal}>
          <Pressable onPress={toggleModal}>
            <Text style={styles.modalText}>Close Modal!</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Open modal </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackgraound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bottomModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  button: {
    width: '50%',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  modal: {
    width: '100%',
    height: '30%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  modalText: {
    fontSize: 20,
  },
});
export default Settings;
