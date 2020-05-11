import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../constants/colors'

const WelcomeScreen = (props) => {
    const { navigation } = props;
    return (
        <TouchableOpacity style={styles.screen} onPress={() => navigation.navigate('userType')}
            activeOpacity={0.8}
        >
            <View >
                <View style={styles.logoContainer}>
                    <View >
                        <Text style={styles.logoName}>DocMA</Text>
                    </View>
                    <View style={styles.threePointsContainer}>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    logoName: {
        fontFamily: 'PoppinsRegular',
        fontSize: 61,
        color: '#fff',
        paddingBottom: 0
    },
    logoPoints: {
        fontSize: 61,
        color: '#fff',
        textAlign: 'center'
    },
    logoContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    circle: {
        height: 10,
        width: 10,
        backgroundColor: '#FFF',
        borderRadius: 50
    },
    threePointsContainer: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-around'
    }
})
