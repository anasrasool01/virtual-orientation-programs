import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomView from '../../components/MainScreen/BottomView';
import TopView from '../../components/MainScreen/TopView';
import Images from '../../assets/images';

const windowHeight = Dimensions.get('window').height;

interface Props {
  Images: {
    backgroundImage: ImageSourcePropType;
    icons: {
      send: ImageSourcePropType;
      camera: ImageSourcePropType;
      chat: ImageSourcePropType;
      heart: ImageSourcePropType;
    };
  };
}

const MainScreen: React.FC<Props> = () => {
  const [backgroundImage, setBackgroundImage] = useState<ImageSourcePropType>(
    Images.backgroundImage
  );

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const storedBackgroundImage = await AsyncStorage.getItem('userImage');
        if (storedBackgroundImage) {
          setBackgroundImage({uri: storedBackgroundImage});
        }
      } catch (error) {
        console.error('Error fetching backgroundImage:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.top}>
          <TopView />
        </View>
        <View style={styles.bottom} />
        <BottomView />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bottom: {
    height: windowHeight / 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export default MainScreen;
