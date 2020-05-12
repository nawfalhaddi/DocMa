import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import MedecinAuthScreen from '../screens/medecin/MedecinAuthScreen';
import PatientAuthScreen from '../screens/patient/PatientAuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { useSelector, useDispatch } from 'react-redux';
import MedecinConsultationsScreen from '../screens/medecin/MedecinConsultationsScreen';
import MedecinPatientsScreen from '../screens/medecin/MedecinPatientsScreen';
import MedecinCompteScreen from '../screens/medecin/MedecinCompteScreen';
import MedecinCustomHeader from '../components/UI/MedecinCustomHeader';
import * as RootNavigation from './RootNavigator'
import { navigationRef } from './RootNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import * as medecinActions from '../store/actions/medecin';
import * as patientActions from '../store/actions/patient';
import PatientCompteScreen from '../screens/patient/PatientCompteScreen';
import PatientConsulationsScreen from '../screens/patient/PatientConsulationsScreen';
import PatientNewAlert from '../screens/patient/PatientNewAlert';



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
    const patientName = useSelector(state => state.patient.firstName) + " " + useSelector(state => state.patient.lastName);
    return (
        <Stack.Navigator initialRouteName='PatientMovingStack'
            screenOptions={{
                header: (headerProps) => (
                    <MedecinCustomHeader name={patientName}
                        firstItemFunc={() => { headerProps.navigation.navigate("patientConsultations") }}
                        secondItemFunc={() => { headerProps.navigation.navigate('PatientNewAlert') }}
                        thirdItemFunc={() => { headerProps.navigation.navigate('patientCompte') }}
                        firstItemIcon="notifications" secondItemIcon="local-pharmacy" thirdItemIcon="person"
                        firstItemTitle="Consultations" secondItemTitle="Alerte" thirdItemTitle="Mon compte"
                    />
                ),
            }}
        >
            <Stack.Screen name="PatientMovingStack" component={PatientMovingStack} />
        </Stack.Navigator>
    )
}
const PatientMovingStack = () => {
    return (
        <Stack.Navigator initialRouteName='patientConsultations'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="patientConsultations" component={PatientConsulationsScreen} />
            <Stack.Screen name="patientCompte" component={PatientCompteScreen} />
            <Stack.Screen name="PatientNewAlert" component={PatientNewAlert} />
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

const MainStack = (props) => {
    const medecinToken = useSelector(state => state.medecin.token);
    const accessCode = useSelector(state => state.patient.accessCode);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    // AsyncStorage.clear();
    useEffect(() => {
        const tryLogin = async () => {
            setIsLoading(true);
            const medecinData = await AsyncStorage.getItem('medecinData');
            const patientData = await AsyncStorage.getItem('patientData');
            if (medecinData) {
                const transformedData = JSON.parse(medecinData);
                const { email, password } = transformedData;
                await dispatch(medecinActions.login(email, password));
                setIsLoading(false);
            }
            if (patientData) {
                const transformedData = JSON.parse(patientData);
                const { accessCode } = transformedData;
                await dispatch(patientActions.login(accessCode));
                setIsLoading(false);
            }
            setIsLoading(false);
            return;


        }
        tryLogin();
    }, [])

    return (

        <NavigationContainer ref={navigationRef}>
            {isLoading ? <LoadingScreen /> : medecinToken ? <MedecinStack /> : accessCode ? <PatientStack /> : <WelcomeStack />}

        </NavigationContainer>
    )
}

export default MainStack;