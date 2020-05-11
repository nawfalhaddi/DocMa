import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux"
import colors from '../../constants/colors';
import { Button } from 'react-native-elements';
import { commonStyle } from '../../styles';


const MedecinCompteScreen = (props) => {
    const doctor = useSelector(state => state.medecin);
    return (
        <View style={styles.screen}>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Prénom:</Text>
                <Text style={styles.output}>{doctor.firstName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nom:</Text>
                <Text style={styles.output}>{doctor.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.output}>{doctor.email}</Text>
            </View>
            <View style={styles.btnContainer}>
                <Button titleStyle={commonStyle.btnStyle} title="Se déconnecter" buttonStyle={commonStyle.btnBoddyStyle} onPress={() => { }} />
            </View>

        </View>
    )
}

export default MedecinCompteScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 10
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    label: {
        fontFamily: 'PoppinsRegular',
        fontSize: 17,
        color: 'black',
        width: '30%'
    },
    output: {
        fontSize: 20,
        color: colors.primary,
        fontFamily: 'PoppinsSemiBold'
    },
    btnContainer: {
        marginTop: 30
    }
})
