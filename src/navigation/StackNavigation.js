import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import MedecinAuthScreen from '../screens/medecin/MedecinAuthScreen';
import PatientAuthScreen from '../screens/patient/PatientAuthScreen';
import TestScreen from '../screens/TestScreen';
import { useSelector } from 'react-redux';
import MedecinConsultationsScreen from '../screens/medecin/MedecinConsultationsScreen';
import MedecinPatientsScreen from '../screens/medecin/MedecinPatientsScreen';
import MedecinCompteScreen from '../screens/medecin/MedecinCompteScreen';
import MedecinCustomHeader from '../components/UI/MedecinCustomHeader';
import * as RootNavigation from './RootNavigator'

const Stack = createStackNavigator();


const WelcomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="welcome"  >

            <Stack.Screen name="welcome" options={{ headerShown: false }} component={WelcomeScreen} />
            <Stack.Screen name="userType" options={{ headerShown: false }} component={UserTypeScreen} />
            <Stack.Screen name="medecin" component={MedecinAuthScreen} />
            <Stack.Screen name="patient" component={PatientAuthScreen} />
        </Stack.Navigator>
    )
}


const MedecinStack = () => {
    const doctorName = "Dr " + useSelector(state => state.medecin.firstName) + " " + useSelector(state => state.medecin.lastName);
    return (

        <Stack.Navigator
            screenOptions={{
                header: (headerProps) => (
                    <MedecinCustomHeader name={doctorName}
                        firstItemFunc={() => { headerProps.navigation.navigate("consultationsAlertes") }}
                        secondItemFunc={() => { headerProps.navigation.navigate("patients") }}
                        thirdItemFunc={() => { headerProps.navigation.navigate('compte') }}
                        firstItemIcon="notifications" secondItemIcon="local-pharmacy" thirdItemIcon="person"
                        firstItemTitle="Consultations" secondItemTitle="Patients" thirdItemTitle="Mon compte"
                    />
                ),

            }}
            initialRouteName="consultations" >
            <Stack.Screen name="consultations" component={MedecinMovingStack} />
        </Stack.Navigator>



    )
}


const PatientStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="consultations" component={TestScreen} />
            <Stack.Screen name="compte" component={TestScreen} />
        </Stack.Navigator>
    )
}

const MedecinMovingStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="consultationsAlertes" component={MedecinConsultationsScreen} />
        <Stack.Screen name="patients" component={MedecinPatientsScreen} />
        <Stack.Screen name="compte" component={MedecinCompteScreen} />
    </Stack.Navigator>
)

export default MainStack = () => {
    return (
        <MedecinStack />
    )
}