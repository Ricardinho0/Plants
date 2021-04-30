import React, { useState } from 'react';
import { ScrollView, StyleSheet, View,Text, Image, Alert, TouchableOpacity, Platform,  } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import waterprops from '../assets/waterdrop.png'
import { Button } from '../components/button';
import { useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { isBefore } from 'date-fns';

interface Params{
    plant: {
        id: string;
        name: string;
        about: string;
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
            times: number;
            repeat_every: string;
        }
    }
}

export function PlantSave(){

const [selectedTime, setselectedTime] = useState(new Date());
const [showDate, setShowdate] = useState(Platform.OS == 'ios');

const route = useRoute();
const { plant } = route.params as Params; 

function handleChangeTime(event: Event, dateTime: Date | undefined){
    if(Platform.OS == 'android'){
        setShowdate(oldState => !oldState)
    }
    if(dateTime && isBefore(dateTime, new Date())){
        setselectedTime(new Date());
        return Alert.alert('Escolha uma hora no futuro! ⏰')
    }
    if(dateTime){
        setselectedTime(dateTime);
    }
}

return(
    <>
    <View style={styles.conteiner}>
        <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150}/>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}> 
            {plant.about}
         </Text>
         </View>
    </View>
    <View style={styles.controllers}>
        <View style={styles.tipconteiner}>
            <Image source={waterprops} style={styles.tipImage}/>
            <Text style={styles.tipText}>
                 {plant.water_tips}
            </Text>
        </View>
        <Text style={styles.alertLabel}>Escolha o melhor horario para ser lembredo:</Text>
        {showDate && (
            <DateTimePicker 
            value={selectedTime}
            mode="time" 
            display='spinner'
            onChange={handleChangeTime}/>
        )}
        
        <Button title='cadastrar Planta' onPress={()=>{}}/>
    </View>
    </>
)
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:  colors.shape
    },
    controllers:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipconteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        height: 56,
        width: 56
    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    }
})