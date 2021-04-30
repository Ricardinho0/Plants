import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, 
    TextInput, View, KeyboardAvoidingView, Platform, 
    TouchableWithoutFeedback, Keyboard, Alert } 
from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIndentification(){

const [isFocused, setIsFocused] = useState(false);
const [isFilled, setIsFiled] = useState(false);
const [name, setName] = useState('');

const navigation = useNavigation()

async function hadlerSubmit(){
    if(!name)
        return Alert.alert('Me diz como chamar você 😅')
    await AsyncStorage.setItem('@plantmaneger:user', name);

  navigation.navigate('Confirmation')
}


function handlerInputBlur(){
    setIsFocused(false)
    setIsFiled(!!name)
}

function handlerInputFocus(){
    setIsFocused(true)
}

function handlerInputChange( value){
    setIsFiled(!!value);
    setName(value);
}

return(
        <SafeAreaView style={styles.consteiner}>
            <KeyboardAvoidingView style={styles.consteiner} behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <View style={styles.header}>
                    <Text style={styles.emoji}>
                     { isFilled ? '😄' : '😀'}
                    </Text>
                    <Text style={styles.title}>
                        como podemos {'\n'}chamar você?
                    </Text>
                    </View>
                    <TextInput 
                        style={[
                            styles.input, 
                            (isFocused || isFilled) && {borderColor: colors.green}
                        ]} 
                        placeholder='Digite Um Nome'
                        onBlur={handlerInputBlur}
                        onFocus={handlerInputFocus}
                        onChangeText={handlerInputChange}
                    />
                    <View style={styles.footer}>
                        <Button title='confirmar' onPress={hadlerSubmit}/>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    consteiner:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content:{
        flex: 1,
        width: '100%'
    },
    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header:{
        alignItems: 'center'
    },
    emoji:{
        fontSize: 44
    },
    input:{
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center' 
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20

    }
})