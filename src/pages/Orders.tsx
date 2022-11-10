import {Button, Text, View} from 'react-native';

function Orders({navigation}: any) {
  return (
    <View>
      <Text>Order List</Text>
      <Button
        title="Open Detail"
        onPress={() => navigation.navigate('OrderDetail')}
      />
    </View>
  );
}

export default Orders;
