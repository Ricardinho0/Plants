import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Header(){

const [userName, setUserName] = useState<string>();

useEffect(() => {
    async function loadStorageUserName(){
       const user = await AsyncStorage.getItem('@plantmaneger:user');
       setUserName(user || '');
    }
    loadStorageUserName()
},[userName])

return(
        <View style={styles.conteiner}>
            <View>
                <Text style={styles.greeting}>Olá, </Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image 
            source={require('../../assets/user.jpg')}
            style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    greeting:{
        color: colors.heading,
        fontSize: 32,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})