import React from 'react';
import { View, Text, Image } from 'react-native';

const SecondImageScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is the first image screen!</Text>
            <Image source={require("../../assets/images/backGround.jpeg")} />
        </View>
    );
};

export default SecondImageScreen;