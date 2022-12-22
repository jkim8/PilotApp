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
        source={require('../assets/winter.jpeg')}
        resizeMode="cover"
        style={styles.background}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
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
    color: '#307bf2',
    fontSize: 16,
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Home;
