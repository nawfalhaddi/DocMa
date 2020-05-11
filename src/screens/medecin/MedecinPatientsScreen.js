import React, { useState } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import PatientProfilModal from '../../components/medecin/PatientProfilModal'


const MedecinPatientsScreen = (props) => {
    const patients = useSelector(state => state.medecin.patients);

    return (
        <View style={{ flex: 1, }}>

            <FlatList
                data={patients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PatientComponent patient={item} />
                )}
            />

        </View>

    )
}

const PatientComponent = (props) => {
    const patient = props.patient;
    const [patientModalVisible, setPatientModalVisible] = useState(false);
    return (
        <View>
            <TouchableOpacity onPress={() => { setPatientModalVisible(true) }} style={styles.screen}>
                <View style={styles.patientContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="panorama-fish-eye" color="#71CD7F" />
                        <Text style={styles.patientName}>{patient.fname + ' ' + patient.lname}</Text>
                    </View>
                    <Icon name="trending-flat" color="#71CD7F" containerStyle={{ marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <PatientProfilModal patient={patient} patientModalVisible={patientModalVisible} exitModal={() => setPatientModalVisible(false)} />
        </View>
    )
}

export default MedecinPatientsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    patientContainer: {
        height: 40,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        borderRadius: 13,
        shadowRadius: 15,
        shadowOpacity: 0.1,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    patientName: {
        fontSize: 15,
        fontFamily: 'PoppinsRegular',
        marginLeft: 10
    }
})
