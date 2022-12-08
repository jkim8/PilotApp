import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchBar} from '@rneui/themed';
import {useEffect, useState} from 'react';
import ItemBarcodeComponent from '../components/ItemBarcodeComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from '@rneui/base';

const Stack = createNativeStackNavigator();
const WIDTH = Dimensions.get('window').width;

function BarcodeScan({navigation}: any) {
  const isFocused = useIsFocused();

  const [search, setSearch] = useState('');
  const [scannedItem, setScannedItem] = useState([]);
  useEffect(() => {
    console.log('scanned:' + JSON.stringify(scannedItem));
  }, [scannedItem]);

  const updateSearch = search => {
    setSearch(search);
  };
  const getBarcode = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Barcode');
      if (value !== null) {
        console.log(`barcode : ${value}`);
        setSearch(value);
        await AsyncStorage.removeItem('@storage_Barcode');
        searchBarcode(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log('isFocus scan item');

      getBarcode();
    }
  }, [isFocused]);

  const searchBarcode = async (barcode: any) => {
    console.log(barcode);
    try {
      const {data} = await axios.get(
        `https://glborderpadserverapitest.azurewebsites.net/api/GLBOrderPads/SelectItemByBarcode?companySeq=5&barCode=${barcode}`,
      );
      if (data[0].CompanySeq === 5) {
        setScannedItem(data);
      } else if (data[0].CompanySeq === 0) {
        nonExistBarcode(barcode);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('등록되지 않은 바코드 입니다.');
    }
  };

  const nonExistBarcode = async (barcode: any) => {
    try {
      const {data} = await axios.get(
        'https://api.upcitemdb.com/prod/v1/lookup?upc=' + barcode,
        {
          headers: {
            'Content-Type': 'application/json',
            user_key: '1e77cf2c45d84d485bcddb6dc31d8544',
            key_type: '3scale',
          },
        },
      );

      var result = [
        {
          ExistBarcode: true,
          ItemColorCode: data.items[0].images[0],
          ItemColor: data.items[0].color,
          BarCode: data.items[0].upc,
          ItemName: data.items[0].title,
          UnitPrice: data.items[0].lowest_recorded_price,
          SalesUnit: data.items[0].lowest_recorded_price,
        },
      ];
      console.log(data.items[0]);
      setScannedItem(result);
      console.log(result);
    } catch (e) {
      console.log(e);
      Alert.alert('등록되지 않은 바코드 입니다.');
    }
  };

  const renderItem = ({item}: any) => <Item item={item} />;
  const Item = ({item}: any) => (
    <View style={styles.listItem}>
      <View style={styles.leftBox}>
        {item.CompanySeq === 5 ? (
          <Image
            style={styles.coverImage}
            source={{
              uri: `https://www.sunssc.com/ItemImg/GLB/${item.ItemColorCode}.jpg`,
            }}
            defaultSource={require('../assets/gb.png')}
          />
        ) : item.ExistBarcode ? (
          <Image
            style={styles.coverImage}
            source={{
              uri: `${item.ItemColorCode}`,
            }}
            defaultSource={require('../assets/gb.png')}
          />
        ) : (
          <Image
            style={styles.coverImage}
            source={require('../assets/gb.png')}
          />
        )}
        {item.CompanySeq === 5 ? (
          <Text style={styles.itemColorCode}>{item.ItemColorCode}</Text>
        ) : (
          <Text style={styles.itemColorCode}>Color: {item.ItemColor}</Text>
        )}

        <Text style={styles.barcode}>[{item.BarCode}]</Text>
      </View>
      <View style={styles.rightBox}>
        <Text numberOfLines={2} style={styles.itemName}>
          {item.ItemName}
        </Text>
        <Text style={styles.unitPrice}>Unit Price : ${item.UnitPrice}</Text>
        <Text style={styles.salesUnit}>
          ${item.UnitPrice} ({item.SalesUnit})
        </Text>
      </View>
    </View>
  );

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
          onPress={() => navigation.navigate('Item Barcode Scanner')}>
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
      {scannedItem ? (
        <FlatList
          data={scannedItem}
          renderItem={renderItem}
          keyExtractor={item => item.BarCode}
        />
      ) : null}
    </View>
  );
}

function ScanItem() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BarcodeScan" component={BarcodeScan} />
      <Stack.Screen
        name="Item Barcode Scanner"
        component={ItemBarcodeComponent}
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
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    width: WIDTH * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  leftBox: {flex: 1},
  rightBox: {
    flex: 2,
  },
  itemColorCode: {
    fontSize: 10,
  },
  barcode: {fontSize: 10},
  itemName: {
    fontSize: 11,
    fontWeight: '700',
    marginRight: 10,
    textAlign: 'left',
    marginBottom: 25,
  },
  unitPrice: {fontSize: 11, textAlign: 'right'},
  salesUnit: {fontSize: 12, color: 'red', textAlign: 'right'},
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScanItem;
