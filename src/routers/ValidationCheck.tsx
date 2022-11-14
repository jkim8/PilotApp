import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

function ValidationCheck() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>ValidationCheck</Text>
        <Pressable style={styles.button}>
          <Text>Verify</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2188dd',
    borderRadius: 15,
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
export default ValidationCheck;
