import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import colors from '../constants/colors'

const LoadingScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.screen}>
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

                <ActivityIndicator size="large" color="white" style={{ marginTop: 60 }} />

            </View>
        </View>

    )
}

export default LoadingScreen

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
