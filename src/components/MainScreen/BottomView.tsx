// BottomView.tsx

import React from 'react';
import { Alert, Dimensions, Image, ImageBackground, ImageSourcePropType, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const imageSourcesRow1: ImageData[] = [
    { source: Images.icons.send, name: 'Send' },
    { source: Images.icons.camera, name: 'Camera' },
    { source: Images.icons.chat, name: 'Chat' },
    { source: Images.icons.heart, name: 'Heart' },
  ];

  const imageSourcesRow2: ImageData[] = [
    { source: Images.icons.camera, name: 'Camera' },
    { source: Images.icons.send, name: 'Send' },
    { source: Images.icons.heart, name: 'Heart' },
    { source: Images.icons.chat, name: 'Chat' },
  ];

  const handleImageClick = (name: string) => {
    console.log(`Clicked image ${name}`);

    if (name === 'Send') {
      navigation.navigate('FirstImageScreen');
    }
    else if (name === 'Camera') {
      navigation.navigate('SecondImageScreen');
    }
    else if (name === 'Heart') {
      navigation.navigate('SecondImageScreen');
    }
    else if (name === 'Chat') {
      navigation.navigate('SecondImageScreen');
    }
    else {
      openWhatsApp(name);
    }
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
        style={styles.imageContainer}
      >
        <ImageBackground source={Images.icons.iconBackground} style={styles.iconBackground}>
          <Image source={data.source} style={styles.image} />
          <Text style={styles.imageText}>{data.name}</Text>
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
    height: 340,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  iconBackground: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: 'white',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  imageContainer: {
    margin: 5,
  },
});
