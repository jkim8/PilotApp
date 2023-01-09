import {Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeItem,
} from '../slices/cart';
import {RootState} from '../store';
import {SwipeListView} from 'react-native-swipe-list-view';
import Entypo from 'react-native-vector-icons/Entypo';

const WIDTH = Dimensions.get('window').width;

function ShoppingCart() {
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState('');
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const cartQty = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity,
  );
  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.cartTotalAmount,
  );

  const deleteAllAlert = () => {
    cartQty === 0
      ? null
      : Alert.alert(
          'Delete All Items',
          'Do you want to delete all items in cart?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => dispatch(clearCart(cart))},
          ],
        );
  };

  useEffect(() => {
    dispatch(getTotals(cart));
    setItemList(cart);
  }, [cart]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = ({item}: any) => <Item item={item} />;
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

        <View style={styles.qtyBox}>
          <Text>Qty: </Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(decreaseCart(item))}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartQtyText}> {item.cartQuantity}</Text>
          <TouchableOpacity style={styles.qtyBtn}>
            <Text
              style={styles.qtyBtnText}
              onPress={() => dispatch(addToCart(item))}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHiddenItem = ({item}, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => dispatch(removeItem(item))}>
          <Entypo name="trash" style={styles.TrashIcon} />
          <Text style={styles.backTextWhite}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topContainerTextBox}>
          <Text style={styles.TopCartQtyText}>Total Qty: {cartQty}</Text>
          <Text style={styles.TopCartPriceText}>
            Total Price: {cartTotalAmount}
          </Text>
        </View>

        <TouchableOpacity style={styles.allDelete} onPress={deleteAllAlert}>
          <Text style={styles.allDeleteText}>Delete All</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, height: 200}}>
        <SwipeListView
          data={itemList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-85}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          disableRightSwipe={true}
          keyExtractor={item => item.BarCode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    height: 120,
    width: WIDTH,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  topContainerTextBox: {flexDirection: 'row'},
  TopCartQtyText: {
    margin: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  TopCartPriceText: {
    margin: 10,
    fontSize: 20,
    fontWeight: '700',
    color: '#C53030',
  },
  allDelete: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6AD55',
    borderRadius: 12,
    marginTop: 10,
  },
  allDeleteText: {fontWeight: '700', color: 'white'},
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
  cartQtyText: {
    width: 25,
    marginTop: 5,
    fontWeight: '700',
    textAlign: 'center',
  },
  qtyBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 25,
    height: 25,
    backgroundColor: '#F6AD55',
    borderRadius: 50,
    justifyContent: 'center',
    margin: 7,
  },
  qtyBtnText: {fontWeight: '700', textAlign: 'center'},
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
    width: 85,
  },

  backRightBtnRight: {
    backgroundColor: '#FC8181',
    right: 0,
  },
  backTextWhite: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  TrashIcon: {
    color: 'white',
    fontSize: 23,
    marginBottom: 22,
  },
});

export default ShoppingCart;
