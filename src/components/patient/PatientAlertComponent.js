import React, { useState, createRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements';
import colors from '../../constants/colors'
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import ReponseMedecinComponent from '../../components/patient/ReponseMedecinComponent'

const AlertComponent = (props) => {
    const alert = props.item;

    const patient = useSelector(state => state.patient)
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Text style={styles.alertDate}>{moment(alert.date).locale('fr').format('LL')}</Text>
            <View style={{ ...styles.mainCard, backgroundColor: alert.vuMedecin === 1 ? 'white' : '#E1E2F2' }}>

                <View style={styles.firstHalfCard}>
                    <View style={styles.personnageContainer}>
                        <Text style={styles.heat}>{alert.temperature}º</Text>
                        <Image source={require('../../assets/pictures/guyWithHeat.png')} style={styles.personnage} />

                        <View style={{ ...styles.stateContainer, backgroundColor: alert.douleurDegre <= 3 ? '#4D5CF0' : alert.douleurDegre <= 6 ? '#FACB39' : alert.douleurDegre <= 8 ? '#FF7442' : '#FF4242' }}>

                            <Text style={{ ...styles.stateOutput }} >{alert.douleurDegre <= 3 ? 'Faible' : alert.douleurDegre <= 6 ? 'Moyenne' : alert.douleurDegre <= 8 ? 'Forte' : 'Insupportable'}</Text>

                            <Text style={styles.stateLabel}>Douleur</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.secondHalfCard}>
                    <View style={styles.minorCard}>
                        <View style={styles.heartBeatsContainer}>
                            <Text style={styles.patientDegre}>{alert.nbrBattement} <Text style={styles.degreUnit}>bpm</Text></Text>
                            <Image source={require('../../assets/pictures/heartBeats.png')} style={styles.heartBeats} />
                        </View>
                        <Text style={styles.patientDegre}>{alert.tension} <Text style={styles.degreUnit}>mmHg</Text></Text>
                    </View>

                    <View style={styles.littleBtnsContainer}>

                        <Button title="Réponse du médecin"
                            icon={
                                <Icon
                                    name="chat-bubble-outline"
                                    size={15}
                                    color={colors.primary}
                                />
                            }
                            titleStyle={styles.btnReponseTitleStyle}
                            buttonStyle={styles.btnReponseStyle}
                            onPress={() => { setModalVisible(true) }}
                            disabled={alert.remarque === "" ? true : false}
                        />
                    </View>


                </View>
            </View>
            <ReponseMedecinComponent modalVisible={modalVisible} closeModal={() => setModalVisible(false)} patient={patient} alert={alert} />
        </View>
    )
}

export default AlertComponent

const styles = StyleSheet.create({
    mainCard: {
        width: '100%',
        shadowOffset: { width: 0, height: 11 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 25,

        flexDirection: 'row',
        padding: 10,
        marginVertical: 10
    },
    firstHalfCard: {
        width: "40%",
        justifyContent: 'center'
    },
    secondHalfCard: {
        width: '60%'
    },
    patientName: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17
    },
    minorCard: {
        borderRadius: 18,
        backgroundColor: '#F2F3FA',
        height: 90,
        padding: 5
    },
    patientDegre: {
        fontSize: 25,
        fontFamily: 'PoppinsRegular',
        color: '#898A8F'
    },
    degreUnit: {
        fontSize: 10
    },
    littleBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    personnageContainer: {
        height: 100,
        width: 114,
        backgroundColor: "#FF744229",
        shadowOffset: { width: 5, height: 8 },
        shadowRadius: 15,
        borderRadius: 18
    },
    personnage: {
        height: 90,
        maxWidth: 90,
        resizeMode: 'contain',
        marginTop: -60,
        alignSelf: 'center'
    },
    heat: {
        paddingTop: 15,
        paddingLeft: 8,
        fontSize: 16,
        fontFamily: 'PoppinsRegular'
    },
    stateContainer: {
        height: 52,
        width: '100%',
        borderRadius: 18
    },
    stateOutput: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
        color: 'white'
    },
    stateLabel: {
        fontSize: 8,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
        color: 'white'
    },
    heartBeats: {
        height: 50,
        maxWidth: 90,
        resizeMode: 'contain',
    },
    heartBeatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alertDate: {
        fontFamily: "PoppinsSemiBold",
        fontSize: 14
    },
    btnReponseTitleStyle: {
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        marginHorizontal: 4,
        color: colors.primary,
    },
    btnReponseStyle: {
        borderRadius: 18,
        width: '100%',
        marginVertical: 5,
        backgroundColor: "#F2F3FA"
    }
})
