import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import AlertComponent from '../../components/medecin/AlertComponent';
import { useSelector } from 'react-redux';
import PatientAlertComponent from '../../components/patient/PatientAlertComponent'


const PatientConsulationsScreen = (props) => {
    const alertes = useSelector(state => state.patient.alertes.sort((a, b) => a.id < b.id));
    return (
        <View style={styles.screen}>
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={alertes}
                    renderItem={({ item }) => <PatientAlertComponent item={item} />}
                />
            </SafeAreaView>



        </View>
    )
}

export default PatientConsulationsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 8,

    },
    safeArea: {
        marginBottom: 20,
        marginTop: 20
    }
})
