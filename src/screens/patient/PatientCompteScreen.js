import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as patientActions from '../../store/actions/patient'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'

const PatientCompteScreen = () => {
    const patient = useSelector(state => state.patient);
    const dispatch = useDispatch()
    return (
        <View style={styles.screen}>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>Nom:</Text>
                <Text style={styles.formOutput}>{patient.lastName}</Text>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>Prénom:</Text>
                <Text style={styles.formOutput}>{patient.firstName}</Text>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.formLabel}>code d'accès:</Text>
                <Text style={styles.formOutput}>{patient.accessCode}</Text>
            </View>


            <Button title='se déconnecter'
                titleStyle={styles.btnTitle}
                buttonStyle={styles.btnStyle}
                onPress={() => {
                    dispatch(patientActions.logout());
                }} />
        </View>
    )
}

export default PatientCompteScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 10
    },
    formControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    formLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 20,
        width: '40%'
    },
    formOutput: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 25,
        color: colors.primary,
    },
    btnTitle: {
        fontSize: 14,
        fontFamily: 'PoppinsSemiBold'
    },
    btnStyle: {
        borderRadius: 25,
        backgroundColor: colors.primary,
    }
})
