import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Forth Item',
  },
  {
    id: '5',
    title: 'Fifth Item',
  },
  {
    id: '6',
    title: 'Sixth Item',
  },
  {
    id: '7',
    title: 'Seventh Item',
  },
  {
    id: '8',
    title: 'Eighth Item',
  },
  {
    id: '9',
    title: 'Ninth Item',
  },
  {
    id: '10',
    title: 'Tenth Item',
  },
  {
    id: '11',
    title: 'Tenth Item',
  },
  {
    id: '12',
    title: 'Tenth Item',
  },
  {
    id: '13',
    title: 'Tenth Item',
  },
  {
    id: '14',
    title: 'Tenth Item',
  },
  {
    id: '15',
    title: 'Tenth Item',
  },
  {
    id: '16',
    title: 'Tenth Item',
  },
  {
    id: '17',
    title: 'Tenth Item',
  },
  {
    id: '18',
    title: 'Tenth Item',
  },
  {
    id: '19',
    title: 'Tenth Item',
  },
  {
    id: '20',
    title: 'Tenth Item',
  },
  {
    id: '21',
    title: 'Tenth Item',
  },
  {
    id: '22',
    title: 'Tenth Item',
  },
  {
    id: '23',
    title: 'Tenth Item',
  },
  {
    id: '24',
    title: 'Tenth Item',
  },
  {
    id: '25',
    title: 'Tenth Item',
  },
  {
    id: '26',
    title: 'Tenth Item',
  },
  {
    id: '27',
    title: 'Tenth Item',
  },
  {
    id: '28',
    title: 'Tenth Item',
  },
  {
    id: '29',
    title: 'Tenth Item',
  },
  {
    id: '30',
    title: 'Tenth Item',
  },
  {
    id: '31',
    title: 'Tenth Item',
  },
  {
    id: '32',
    title: 'Tenth Item',
  },
  {
    id: '33',
    title: 'Tenth Item',
  },
  {
    id: '34',
    title: 'Tenth Item',
  },
  {
    id: '34',
    title: 'Tenth Item',
  },
  {
    id: '35',
    title: 'Tenth Item',
  },
  {
    id: '36',
    title: 'Tenth Item',
  },
];

const Item = ({title}: any) => (
  <View style={styles.item}>
    <Image
      style={{width: 70, height: 70}}
      source={require('../assets/ios.png')}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

function Home() {
  const renderItem = ({item}: any) => <Item title={item.title} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  item: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: WIDTH / 3 - 20,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  title: {fontSize: 15},
});

export default Home;
