import React, { useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import colors from '../../constants/colors'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import * as RootNavigation from '../../navigation/RootNavigator'

const RemarqueHeader = (props) => {

    return (
        <View style={styles.screen}>
            <View style={styles.headercontainer}>
                <Icon containerStyle={{ marginTop: 35, marginLeft: 10 }} color="white" type="material" name="close" onPress={() => { props.closeModal() }} />
                <Text style={styles.headerTitle}>{props.name}</Text>
            </View>
            <View style={styles.informationsContainer}>
                <View style={styles.firstHalf}>
                    <Text style={styles.stateOutput}>{props.douleurDegre <= 3 ? 'Faible' : alert.douleurDegre <= 6 ? 'Moyenne' : alert.douleurDegre <= 8 ? 'Forte' : 'Insupportable'}</Text>
                    <Text style={styles.stateLabel}>Douleur</Text>

                </View>
                <View style={styles.secondHalf}>
                    <View style={styles.heatAndBeatContainer}>
                        <Text style={styles.beatDegre}>{props.battement} <Text style={styles.beatDegreUnit}>bpm </Text></Text>
                        <Text style={styles.heatDegre}> {props.temperature}°</Text>
                    </View>
                    <View style={styles.heatAndBeatContainer}>
                        <Text style={styles.beatDegre}>{props.tension} <Text style={styles.beatDegreUnit}>mmHg</Text></Text>
                    </View>

                </View>


            </View>

        </View>
    )
}

export default RemarqueHeader

const styles = StyleSheet.create({
    headercontainer: {
        backgroundColor: colors.primary,
        height: 100,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row'
    },
    headerTitle: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17,
        color: 'white',
        marginLeft: 35,
        marginTop: 35
    },
    screen: {
        backgroundColor: Platform.OS === 'ios' ? '#f2f2f2' : null
    },
    informationsContainer: {
        width: "80%",
        height: 100,
        borderRadius: 18,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: -30,
        flexDirection: 'row'

    },
    firstHalf: {
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stateOutput: {
        fontSize: 13,
        fontFamily: 'PoppinsSemiBold',
        color: '#FF7442'
    },
    stateLabel: {
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
        color: '#FF7442'
    },
    secondHalf: {
        flex: 1,
        justifyContent: 'center'
    },
    heatAndBeatContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    beatDegre: {
        fontFamily: "PoppinsRegular",
        fontSize: 25,
        color: "#616161"
    },
    heatDegre: {
        fontFamily: "PoppinsRegular",
        fontSize: 25,
        color: '#616161'
    },
    beatDegreUnit: {
        fontSize: 12
    }


})
