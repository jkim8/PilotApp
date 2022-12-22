import {useState} from 'react';
import {Modal, Pressable, StyleSheet, Switch, Text, View} from 'react-native';

function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text>{isEnabled ? 'Switch is ON' : 'Switch is OFF'}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#ffbb3d'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
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
