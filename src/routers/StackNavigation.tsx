import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderDetail from '../pages/OrderDetail';
import Orders from '../pages/Orders';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: true}}
      initialRouteName="Orders">
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
