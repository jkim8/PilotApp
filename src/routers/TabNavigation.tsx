import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../pages/Settings';
import Home from '../pages/Home';
import MenuButton from './MenuButton';
import Icon from 'react-native-vector-icons/Ionicons';
import StackNavigation from './StackNavigation';
import NewBarcodeComponent from '../components/NewBarcodeComponent';
import OldBarcodeComponent from '../components/OldBarcodeComponent';
import ScanItem from '../pages/ScanItem';
import ShoppingCart from '../pages/ShoppingCart';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect, useState} from 'react';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  const [totalQty, setTotalQty] = useState(0);
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const getTotalCartQty = item => {
    const cartItemsQty = cart.map(item => item.cartQuantity);
    let totalQtyNumber = 0;

    cartItemsQty.forEach(item => {
      totalQtyNumber += item;
    });
    setTotalQty(totalQtyNumber);
  };

  useEffect(() => {
    getTotalCartQty(cart);
  });

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <MenuButton />,
          tabBarIcon: () => <Icon name="home-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={StackNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="cart-outline" size={25} />,
        }}
      />
      {totalQty === 0 ? (
        <Tab.Screen
          name="Cart"
          component={ShoppingCart}
          options={{
            tabBarIcon: () => <Icon name="cart-outline" size={25} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="Cart"
          component={ShoppingCart}
          options={{
            tabBarBadge: totalQty,
            tabBarBadgeStyle: {
              backgroundColor: '#E33535',
              color: 'white',
              fontWeight: '700',
            },
            tabBarIcon: () => <Icon name="cart-outline" size={25} />,
          }}
        />
      )}

      <Tab.Screen
        name="OldBarcode"
        component={OldBarcodeComponent}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: () => <Icon name="barcode-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="NewBarcode"
        component={NewBarcodeComponent}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: () => <Icon name="barcode-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="ScanItem"
        component={ScanItem}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: () => <Icon name="barcode-outline" size={25} />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => <Icon name="settings-outline" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
