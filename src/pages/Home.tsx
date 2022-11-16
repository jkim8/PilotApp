import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpeg')}
        resizeMode="cover"
        style={styles.background}>
        <TouchableOpacity
          style={{padding: 30}}
          onPress={() => {
            Linking.openURL('https://www.sunssc.com/global/pilot/');
          }}>
          <Text style={styles.text}>App update link</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 25,
  },
});

export default Home;
