import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewBarcodeComponent from '../components/NewBarcodeComponent';
import {SearchBar} from '@rneui/themed';
import {useState} from 'react';

const Stack = createNativeStackNavigator();
const WIDTH = Dimensions.get('window').width;

function BarcodeScan({navigation}: any) {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Type Barcode Here..."
          inputStyle={{fontSize: 15}}
          onChangeText={updateSearch}
          value={search}
          lightTheme={true}
          containerStyle={{width: WIDTH - 60}}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('New Barcode Scanner')}>
          <View style={styles.buttonContainer}>
            <Icon
              style={styles.icon}
              name="camera-outline"
              size={25}
              color="white"
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

function ScanItem() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BarcodeScan" component={BarcodeScan} />
      <Stack.Screen
        name="New Barcode Scanner"
        component={NewBarcodeComponent}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  buttonContainer: {
    flexGrow: 1,
    height: 65,
    width: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2188dd',
    borderRadius: 50,
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
});

export default ScanItem;
