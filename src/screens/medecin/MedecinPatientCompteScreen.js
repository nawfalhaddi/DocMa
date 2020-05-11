import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { Button } from 'react-native-elements';
import colors from '../../constants/colors';

const MedecinPatientCompteScreen = (props) => {
    const patient = props.patient;
    const [isEnabled, setIsEnabled] = useState(patient.active === 1 ? true : false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View>
            <View style={styles.card}>
                <View style={styles.formControl}>
                    <Text style={styles.compteActifLabel}>Compte Actif:</Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.codeAccessLabel}>Code d'accès:</Text>
                    <Text style={styles.codeAccessOutput}>234564</Text>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.formLabel}>Nom: </Text>
                    <Text style={styles.formOutput}>Bakkali</Text>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.formLabel}>Prénom: </Text>
                    <Text style={styles.formOutput}>Nizar</Text>
                </View>

                <Button title="Enregistrer" titleStyle={styles.btnTitleStyly} buttonStyle={styles.btnStyle} onPress={() => { }} />


            </View>
        </View>
    )
}

export default MedecinPatientCompteScreen

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: '70%',
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 5,
        marginTop: 20
    },
    formControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    formLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 15,
        marginLeft: 15,
        width: "50%"
    },
    formOutput: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold',
    },
    compteActifLabel: {
        marginLeft: 15,
        fontSize: 20,
        width: "50%",
        fontFamily: 'PoppinsSemiBold'
    },
    codeAccessLabel: {
        fontSize: 15,
        marginLeft: 15,
        width: "50%",
        fontFamily: 'PoppinsRegular'
    },
    codeAccessOutput: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold'
    },
    btnTitleStyly: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14
    },
    btnStyle: {
        width: "90%",
        backgroundColor: colors.primary,
        borderRadius: 18,
        alignSelf: 'center',
        marginTop: 15

    }
})
