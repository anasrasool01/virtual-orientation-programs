import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Images from '../../assets/images';
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
interface ImageData {
  source: ImageSourcePropType;
  name: string;
}

const windowHeight = Dimensions.get('window').height;

const BottomView: React.FC<Props> = () => {
  const imageSourcesRow1: ImageData[] = [
    { source: Images.icons.send, name: 'Send' },
    { source: Images.icons.camera, name: 'Camera' },
    { source: Images.icons.chat, name: 'Chat' },
    { source: Images.icons.heart, name: 'Heart' },
  ];

  const imageSourcesRow2: ImageData[] = [
    { source: Images.icons.send, name: 'Send' },
    { source: Images.icons.camera, name: 'Camera' },
    { source: Images.icons.chat, name: 'Chat' },
    { source: Images.icons.heart, name: 'Heart' },
  ];

  const handleImageClick = (name: string) => {
    console.log(`Clicked image ${name}`);
    openWhatsApp(name);

    // switch (name) {
    //   case 'Chat':
    //     openWhatsApp(name);
    //     break;
    //   case 'Camera':
    //     openWhatsApp(name);
    //     break;
    //   default:
    //     openWhatsApp(name);
    //     break;
    // }
  };

  const openWhatsApp = async (name: string) => {
    const url = 'whatsapp://';

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        `${name} Not Found`,
        `${name} is not installed on your device`,
      );
    }
  };

  const renderImagesRow = (images: ImageData[]) => {
    return images.map((data, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleImageClick(data.name)}
        activeOpacity={0.8}
        style={styles.imageContainer}>
        <ImageBackground source={Images.icons.iconBackground}>
          <Image source={data.source} style={styles.image} />
        </ImageBackground>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={[styles.bottom, styles.container]}>
      <View style={styles.row}>{renderImagesRow(imageSourcesRow1)}</View>
      <View style={styles.row}>{renderImagesRow(imageSourcesRow2)}</View>
    </View>
  );
};

export default BottomView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bottom: {
    height: windowHeight / 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  iconBackground: {
    flex: 1,
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  imageContainer: {
    margin: 5,
  },
});
