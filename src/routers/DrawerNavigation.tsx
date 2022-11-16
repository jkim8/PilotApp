import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

const CustomDrawer = ({navigation}: any) => {
  const goToStack = (stackName: string) => {
    navigation.navigate(stackName);
  };
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        onPress={() => goToStack('Home')}
        style={{
          borderBottomWidth: 1,
          borderRadius: 0,
          borderColor: '#ccc',
        }}
      />
      <DrawerItem label="Orders" onPress={() => goToStack('Orders')} />
      <DrawerItem
        label="Old Bacode Scan"
        onPress={() => goToStack('OldBarcode')}
      />
      <DrawerItem
        label="New Bacode Scan"
        onPress={() => goToStack('NewBarcode')}
      />
      <DrawerItem label="Settings" onPress={() => goToStack('Settings')} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={({navigation}: any) => (
        <CustomDrawer navigation={navigation} />
      )}>
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
