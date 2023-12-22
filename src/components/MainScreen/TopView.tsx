import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const TopView = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 1')}>
          <Text>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 2')}>
          <Text>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 3')}>
          <Text>Button 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
    right: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default TopView;
