import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active = false,
    ...rest
}: EnviromentButtonProps) {
    return (
    <RectButton 
        style={[styles.conteiner,
             active && styles.consteinerActive]}
        {...rest}
    >
        <Text style={[styles.text,
            active && styles.textActive]}>
            {title}
        </Text>
    </RectButton>
)
}
const styles = StyleSheet.create({
    conteiner: {
        backgroundColor:colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    consteinerActive:{
        backgroundColor: colors.green_light
    },
    text:{
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive:{
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})


