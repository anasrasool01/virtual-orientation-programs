import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomView from '../../components/MainScreen/BottomView';
import TopView from '../../components/MainScreen/TopView';
import Images from '../../assets/images';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import ViewTwo from '../../components/MainScreen/ViewTwo';

const MyCarousel = ({ data }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderItem = ({ item }) => (
    <View>
      <Text style={{ paddingRight: 10 }}>{item.title}</Text>
    </View>
  );

  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={windowHeight}
        itemWidth={360}
        layout={'default'}
        loop={false}
        autoplay={false}
        autoplayInterval={false}
        onSnapToItem={(index: React.SetStateAction<number>) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{ marginTop: -55 }}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 5,
          marginTop: 35,
          // backgroundColor: 'blue',
        }}
        inactiveDotStyle={{
          // width: 10,
          // height: 10,
          borderRadius: 5,
          backgroundColor: 'lightgray',
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      />
    </View>
  );
};


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
          setBackgroundImage({ uri: storedBackgroundImage });
        }
      } catch (error) {
        console.error('Error fetching backgroundImage:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  const carouselData = [
    {
      title: <BottomView Images={{
        backgroundImage: 0,
        icons: {
          send: 0,
          camera: 0,
          chat: 0,
          heart: 0
        }
      }} />
    },
    {
      title: <ViewTwo Images={{
        backgroundImage: 0,
        icons: {
          send: 0,
          camera: 0,
          chat: 0,
          heart: 0
        }
      }} />
    },
    // { title: 'Item 2' },
    // { title: 'Item 3' },
  ];
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.top}>
          <TopView />
        </View>
        <View style={styles.bottom}>
          <MyCarousel data={carouselData} />
        </View>
        {/* <View style={styles.bottom} /> */}
        {/* <BottomView /> */}
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
  },
  bottom: {
    height: windowHeight / 2,
    alignItems: 'center',
    justifyContent: "flex-start",
    // marginBottom: 10,
  },
});

export default MainScreen;
