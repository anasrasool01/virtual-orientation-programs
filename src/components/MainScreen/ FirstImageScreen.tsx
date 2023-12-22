import React from 'react';
import { View, Text, Image } from 'react-native';

const FirstImageScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is the first image screen!</Text>
            <Image source={require("../../assets/images/cpdInner.jpeg")} />
        </View>
    );
};

export default FirstImageScreen;
