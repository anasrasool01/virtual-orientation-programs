import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import {Linking} from 'react-native';
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
interface ImageData {
  source: ImageSourcePropType;
  name: string;
}

const Example: React.FC<Props> = () => {
  const imageSourcesRow1: ImageData[] = [
    {source: Images.icons.send, name: 'Send'},
    {source: Images.icons.camera, name: 'Camera'},
    {source: Images.icons.chat, name: 'Chat'},
    {source: Images.icons.heart, name: 'Heart'},
  ];

  const imageSourcesRow2: ImageData[] = [
    {source: Images.icons.send, name: 'Send'},
    {source: Images.icons.camera, name: 'Camera'},
    {source: Images.icons.chat, name: 'Chat'},
    {source: Images.icons.heart, name: 'Heart'},
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
    <ImageBackground
      source={Images.backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.top} />
        <View style={styles.bottom}>
          <View style={styles.row}>{renderImagesRow(imageSourcesRow1)}</View>
          <View style={styles.row}>{renderImagesRow(imageSourcesRow2)}</View>
        </View>
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
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  iconBackground: {
    flex: 1,
    width: 90,
    height: 90,
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

export default Example;
