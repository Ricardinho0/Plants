import React, { useState } from 'react';
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View} from 'react-native';
import LottieView from 'lottie-react-native';

import LoadingAnimation from '../../assets/load.json';

export function Load(){
    return(
        <View style={styles.conteiner}>
            <LottieView 
                source={LoadingAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation:{
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }
})