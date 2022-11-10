import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BarcodeScan from '../pages/BarcodeScan';
import Settings from '../pages/Settings';
import Home from '../pages/Home';
import MenuButton from './MenuButton';
import Icon from 'react-native-vector-icons/Ionicons';
import StackNavigation from './StackNavigation';

const Tab = createBottomTabNavigator();

function TabNavigation() {
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
        name="Order"
        component={StackNavigation}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="cart-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="BarcodeScan"
        component={BarcodeScan}
        options={{tabBarIcon: () => <Icon name="barcode-outline" size={25} />}}
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
