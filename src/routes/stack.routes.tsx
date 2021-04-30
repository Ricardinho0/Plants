import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/welcome';
import { UserIndentification } from '../pages/userIndentification';
import { Confirmation } from '../pages/Confirmation';
import { PlaintSelect } from '../pages/PlaintSelect';
import { PlantSave } from '../pages/PlaintSave'
const stackRoutes = createStackNavigator();
const AppRoutes: React.FC = ()  => (
    <stackRoutes.Navigator 
        headerMode='none' 
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen 
            name='Welcome'
            component={Welcome}
        />
        <stackRoutes.Screen 
            name='UserIndentification'
            component={UserIndentification}
        />
        <stackRoutes.Screen 
            name='Confirmation'
            component={Confirmation}
        />
        <stackRoutes.Screen 
            name='PlaintSelect'
            component={PlaintSelect}
        />
        <stackRoutes.Screen 
            name='PlaintSave'
            component={PlantSave}
        />


    </stackRoutes.Navigator>
)
export default AppRoutes;