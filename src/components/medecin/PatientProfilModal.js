import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import MedecinPatientProfilHeader from '../UI/MedecinPatientProfilHeader';
import MedecinPatientEvolutionScreen from '../../screens/medecin/MedecinPatientEvolutionScreen'
import MedecinPatientCompteScreen from '../../screens/medecin/MedecinPatientCompteScreen';
import MedecinPatientConsultationsScreen from '../../screens/medecin/MedecinPatientConsultationsScreen';
import { useSelector } from 'react-redux';

const PatientProfilModal = (props) => {
    const patientModalVisible = props.patientModalVisible;
    const patient = props.patient;
    const patientAlertes = useSelector(state => state.alertes.alertes.filter(item => item.idPatient === patient.id))
    const [selectedScreen, setSelectedScreen] = useState(1)
    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={patientModalVisible}
            onRequestClose={() => {
                setSelectedScreen(1)
                props.exitModal()
            }}>
            <View>
                <MedecinPatientProfilHeader name={patient.fname + " " + patient.lname}
                    firstItemIcon={"show-chart"} secondItemIcon={"notifications"} thirdItemIcon={"vpn-key"}
                    firstItemTitle={"Evolution"} secondItemTitle={"Consultations"} thirdItemTitle={"Accés"}
                    firstItemFunc={() => { setSelectedScreen(1) }} secondItemFunc={() => { setSelectedScreen(2) }} thirdItemFunc={() => { setSelectedScreen(3) }}
                    exitModal={() => {
                        setSelectedScreen(1);
                        props.exitModal()
                    }}
                />

            </View>
            {
                selectedScreen === 1 ? <MedecinPatientEvolutionScreen patient={patient} /> : selectedScreen === 2 ? <MedecinPatientConsultationsScreen patientAlertes={patientAlertes} /> : <MedecinPatientCompteScreen patient={patient} />
            }
        </Modal>
    )
}

export default PatientProfilModal

const styles = StyleSheet.create({})
