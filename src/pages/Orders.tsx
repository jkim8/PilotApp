import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';

const WIDTH = Dimensions.get('window').width;
const BASE_URL =
  'https://glborderpadserverapitest.azurewebsites.net/api/GLBOrderPads/SelectItemByNameRange?companySeq=5&searchStr=annie&viewCount=10&page=';

const Item = ({item}: any) => (
  <View style={styles.listItem}>
    <View style={styles.leftBox}>
      {item.ItemColorCode ? (
        <Image
          style={styles.coverImage}
          source={{
            uri: `https://www.sunssc.com/ItemImg/GLB/${item.ItemColorCode}.jpg`,
          }}
          defaultSource={require('../assets/gb.png')}
        />
      ) : (
        <Image style={styles.coverImage} source={require('../assets/gb.png')} />
      )}

      <Text style={styles.itemColorCode}>{item.ItemColorCode}</Text>
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

function Orders({navigation}: any) {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listPage, setListPage] = useState(1);
  const [bottomLoading, setBottomLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios
        .get(`${BASE_URL}${listPage}`)
        .then(response => {
          if (listPage > 1) {
            let arr = [...itemList, ...response.data];
            setItemList(arr);
          } else {
            setItemList(response.data);
          }
          setBottomLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onEndReached = async () => {
    setBottomLoading(true);
    let pageNumber = listPage + 1;
    setListPage(pageNumber);
    getData();
  };

  const renderItem = ({item}: any) => <Item item={item} />;
  return (
    <View style={styles.container}>
      {/* <Text>Order List</Text>
      <Button
        title="Open Detail"
        onPress={() => navigation.navigate('OrderDetail')}
      /> */}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'gray'} />
        </View>
      ) : (
        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={item => item.BarCode}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            bottomLoading === true ? <ActivityIndicator /> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
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

export default Orders;
