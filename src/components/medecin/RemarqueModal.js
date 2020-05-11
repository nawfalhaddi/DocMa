import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import RemarqueHeader from '../UI/RemarqueHeader';
import { Button } from 'react-native-elements';
import colors from '../../constants/colors';

const RemarqueModal = (props) => {
    const [modalVisible, setmodalVisible] = useState(props.modalVisible);
    const alert = props.alert;
    const patient = props.patient;
    const [remarque, setRemarque] = useState("")
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.modalVisible}
                onRequestClose={() => { props.closeModal() }}>
                <View style={styles.screen}>
                    <RemarqueHeader closeModal={() => { props.closeModal() }} name={patient.fname + " " + patient.lname} douleurDegre={alert.douleurDegre}
                        battement={alert.nbrBattement} temperature={alert.temperature} tension={alert.tension}
                    />

                    <View style={styles.etatContainer}>
                        <Text style={{ ...styles.etat, color: alert.vuMedecin === 1 ? '#71CD7F' : "#FF0219" }}>{alert.vuMedecin === 1 ? "Terminé" : "En attente"} </Text>
                    </View>
                    <View style={styles.remarqueContainer}>
                        <Text style={styles.remarqueLabel}>Remarques</Text>
                        <TextInput
                            style={styles.remarqueInput}
                            multiline={true}
                            placeholder="Rédigez vos remarques…"
                            textAlignVertical="top"
                            onChangeText={setRemarque}
                            value={alert.remarque === "" ? remarque : alert.remarque}
                            editable={alert.remarque === "" ? true : false}
                        />
                        <Button disabled={alert.remarque === "" ? false : true} title="Envoyer" titleStyle={styles.btnTitleStyle} buttonStyle={styles.btnStyle} />

                    </View>
                </View >

            </Modal>
        </TouchableWithoutFeedback>
    )
}

export default RemarqueModal

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        backgroundColor: "#f2f2f2",
    },
    etatContainer: {
        alignItems: 'center'
    },
    etat: {
        fontSize: 15,
        fontFamily: "PoppinsLight",
        width: "80%",
        marginVertical: 10
    },
    remarqueContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        width: "80%",
        height: "60%",
        alignSelf: 'center',
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 20,
        elevation: 5,
        padding: 12
    },
    remarqueLabel: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14,
    },
    remarqueInput: {
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        height: 200,
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        padding: 5
    },
    btnTitleStyle: {
        fontSize: 14,
        fontFamily: 'PoppinsSemiBold'
    },
    btnStyle: {
        borderRadius: 18,
        backgroundColor: colors.primary,
        marginTop: 10
    }
})
