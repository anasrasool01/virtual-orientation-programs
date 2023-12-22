import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Images from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(Images.backgroundImage);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchIsLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem('login');
        setIsLoggedIn(value);
      } catch (error) {
        console.error('Error fetching isLoggedIn:', error);
      }
    };

    fetchIsLoggedIn();
  }, []);

  const handleUpdateImage = async () => {
    setIsEditMode(prev => !prev);

    if (!isEditMode) {
      try {
        const res = await ImageCropPicker.openPicker({
          cropping: true,
          width: 200,
          height: 200,
          cropperCircleOverlay: true,
          freeStyleCropEnabled: true,
          cropperToolbarTitle: 'Edit Image',
        });

        if (!res.cancelled) {
          setUserImage({uri: res.path});
          saveImageToAsyncStorage(res.path);
        }
      } catch (error) {
        console.log('ImagePicker Error: ', error);
      }
    }
  };

  const saveImageToAsyncStorage = async (imagePath: string) => {
    try {
      await AsyncStorage.setItem('userImage', imagePath);
    } catch (error) {
      console.error('Error saving image path:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoggedIn ? (
          <View style={styles.profile}>
            <Image source={userImage} style={styles.image} />
            <TouchableOpacity
              onPress={handleUpdateImage}
              style={isEditMode ? styles.saveButton : styles.editButton}>
              <Text style={styles.buttonText}>
                {isEditMode ? 'Save Image' : 'Edit Image'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.buttonText}>Login First</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    alignItems: 'center',
    // marginTop: 20,
  },
  image: {
    width: 400,
    height: 600,
    // borderRadius: 100,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProfileScreen;
