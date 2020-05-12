import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as patientActions from '../../store/actions/patient'
import { useDispatch } from 'react-redux'

const PatientCompteScreen = () => {
    const dispatch = useDispatch()
    return (
        <View>
            <Text>compte</Text>


            <Button title='deconnecter' onPress={() => {
                dispatch(patientActions.logout());
            }} />
        </View>
    )
}

export default PatientCompteScreen

const styles = StyleSheet.create({})
