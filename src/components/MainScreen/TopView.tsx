import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../assets/images';
import CustomDropdown from '../commonComponents/CustomDropdown';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopView = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [menuItems] = useState([
    {
      id: '1',
      label: 'Profile',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: '2',
      label: 'Login',
      onPress: () => navigation.navigate('Login'),
    },
    {
      id: '3',
      label: 'LogOut',
      onPress: () => handleLogout(),
    },
  ]);
  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('login', 'false');
      Alert.alert('Logged Out', 'You have been logged out successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const handleImageClick = () => {
    setModalVisible(true);
  };

  const handleMenuItemPress = (onPressAction: () => void) => {
    onPressAction();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={handleImageClick}>
          <Image source={Images.icons.menu} style={styles.image} />
        </TouchableOpacity>
      </View>
      <CustomDropdown
        visible={isModalVisible}
        items={menuItems}
        onClose={() => setModalVisible(false)}
        onSelect={handleMenuItemPress}
      />
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
  imageButton: {
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default TopView;
