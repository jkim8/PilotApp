import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../slices/cart';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';
import {RootState} from '../store/reducer';
import {
  globalLoading,
  setGlobalLoadingFalse,
  setGlobalLoadinggFalse,
  setGlobalLoadingTrue,
} from '../slices/user';

const WIDTH = Dimensions.get('window').width;
const BASE_URL =
  'https://glborderpadserverapitest.azurewebsites.net/api/GLBOrderPads/SelectItemByNameRange?companySeq=5&searchStr=annie&viewCount=20&page=1';

function Orders({navigation}: any) {
  const dispatch = useDispatch();

  const loadingAni = useSelector((state: RootState) => state.user.loading);

  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      await axios.get(BASE_URL).then(response => setItemList(response.data));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const {isLoading, isError, data, error} = useQuery('getData', getData);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const addToShoppingCart = (rowMap, rowKey, item) => {
    dispatch(setGlobalLoadingTrue(true));
    setTimeout(() => {
      dispatch(setGlobalLoadingFalse(true));
    }, 1000);
    closeRow(rowMap, rowKey);
    dispatch(addToCart(item));
  };

  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  const renderItem = ({item}: any) => <Item item={item} />;
  const Item = ({item}: any) => (
    <Pressable style={styles.listItem}>
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
          <Image
            style={styles.coverImage}
            source={require('../assets/gb.png')}
          />
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
    </Pressable>
  );

  const renderHiddenItem = ({item}, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(rowMap, item.BarCode)}>
          <Ionicons style={styles.closeIcon} size={30} name="close-circle" />
          <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => addToShoppingCart(rowMap, item.BarCode, item)}>
          <FontAwesome style={styles.bagIcon} size={25} name="shopping-bag" />
          <Text style={styles.backTextWhite}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <Lottie
            ref={animationRef}
            source={require('../assets/loading.json')}
            style={{width: 200, height: 200}}
            autoPlay
            loop
          />
        </View>
      ) : (
        // <View style={styles.loading}>

        //   {/* <ActivityIndicator size="large" color={'gray'} /> */}
        // </View>
        <View style={{flex: 1, height: 200}}>
          <SwipeListView
            data={itemList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            disableRightSwipe={true}
            keyExtractor={item => item.BarCode}
          />
          {loadingAni ? (
            <View style={styles.loading}>
              <Lottie
                ref={animationRef}
                source={require('../assets/cart.json')}
                style={{width: 200, height: 200, zIndex: 2}}
                autoPlay
                loop
              />
            </View>
          ) : null}
        </View>
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#FC8181',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#F6AD55',
    right: 0,
  },
  backTextWhite: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  closeIcon: {
    color: 'white',
    marginBottom: 15,
  },
  bagIcon: {
    color: 'white',
    marginBottom: 23,
  },
});

export default Orders;
