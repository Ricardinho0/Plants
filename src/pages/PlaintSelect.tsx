import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View,Text,FlatList,ActivityIndicator, ActivityIndicatorBase, Alert } from 'react-native';
import colors from '../styles/colors';
import {Header} from '../components/header'
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

interface EnviromentProps{
    key: string;
    title: string;
}
interface PlantProps{
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

export function PlaintSelect(){

    const [enviroments, setEnviroment] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [FilteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setenviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [Img, setImg] = useState('');



    function handlerEnviromentSelected(environment: string){
        setenviromentSelected(environment)
    
        if(environment == 'all'){
            return setFilteredPlants(plants)
        }
        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        )
        setFilteredPlants(filtered);
    }
    

    async function fetchPlants() {
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page${page}`)
        if(!data){
            return setLoading(true)
        }
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        setPlants(data);
    }
    
function handlerFatchMore(distance: number){
    if(distance < 1)
        return;
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
}

const navigation = useNavigation()

function handlerPlantSelect(plant: PlantProps){
    navigation.navigate('PlaintSave', { plant });
}

useEffect(() => {
    async function fetchEnviroment(){
        const { data } = await api.get("plants_environments?_sort=title&_order=asc");
        setEnviroment([
            {
                key: 'all',
                title: 'Todos'
            },
            ...data
        ]);
    }fetchEnviroment();
},[]) 
useEffect(() => {
    fetchPlants();
    setLoading(false);
    setLoadingMore(false);
},[])
if(loading)
    return <Load />
return(
    <View style={styles.conteiner}>
        <View style={styles.header}>
            <Header />
            <Text style={styles.title}>Em qual hambiente</Text>
            <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
        </View>
        <View>
            <FlatList 
                data={enviroments}
                keyExtractor={(item) => String(item.key)}
                renderItem={({ item }) => (
                    <EnviromentButton title={item.title}
                    active={item.key === enviromentSelected}
                    onPress={() => handlerEnviromentSelected(item.key)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
            />
        </View>
        <View style={styles.plants}>
           <FlatList 
                data={FilteredPlants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => ( 
                    <PlantCardPrimary data={item} onPress={() =>handlerPlantSelect(item)}/>  
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({ distanceFromEnd }) => {
                    handlerFatchMore(distanceFromEnd)
                }}
                ListFooterComponent={
                    loadingMore ?
                    <ActivityIndicator color={colors.green} />
                    : <></>
                }
           />
        </View>
        
     </View>
)
}

const styles = StyleSheet.create({
    conteiner:{
        flex: 1,
        backgroundColor: colors.background
    },
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle:{
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    header:{
        paddingHorizontal: 30
    },
    enviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})