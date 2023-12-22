import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import Images from '../../assets/images';
import BottomView from '../../components/MainScreen/BottomView';
import TopView from '../../components/MainScreen/TopView';

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
  return (
    <ImageBackground
      source={Images.backgroundImage}
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
