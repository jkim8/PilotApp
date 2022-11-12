import {Pressable, StyleSheet, Text, View} from 'react-native';

function ValidationCheck() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>ValidationCheck</Text>
        <Pressable style={styles.button}>
          <Text>Verify</Text>
        </Pressable>
      </View>
    </>
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
    width: 100,
  },
});
export default ValidationCheck;
