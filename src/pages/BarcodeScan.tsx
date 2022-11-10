import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Camera from './Camera';
import Complete from './Complete';

const Stack = createNativeStackNavigator();

function BarcodeScan() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default BarcodeScan;
