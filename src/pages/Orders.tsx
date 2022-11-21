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
  const [itemList, setItemList] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [listPage, setListPage] = useState(20);

  const fetchItemList = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setItemList(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        `https://glborderpadserverapitest.azurewebsites.net/api/GLBOrderPads/SelectItemByNameRange?companySeq=5&searchStr=annie&viewCount=${listPage}&page=1`,
      );
      setItemList(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  const onEndReached = async () => {
    console.log('reached');

    setListPage(listPage + 20);

    const response = await axios.get(
      `https://glborderpadserverapitest.azurewebsites.net/api/GLBOrderPads/SelectItemByNameRange?companySeq=5&searchStr=annie&viewCount=${listPage}&page=1`,
    );
    setItemList(response.data); // 데이터는 response.data 안에 들어있습니다.
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  console.log(itemList);

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
          onEndReachedThreshold={0.7}
          ListFooterComponent={loading && <ActivityIndicator />}
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
