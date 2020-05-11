import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-elements'
import colors from '../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserTypeScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.screen}>
            <Image source={require('../assets/pictures/doctors.png')} style={styles.img} />
            <View>
                <Text style={styles.title}>Bienvenue</Text>
                <Text style={styles.subTitle}>Veuillez choisir le mode de connexion qui vous correspond:</Text>
            </View>
            <View>
                <Button type={"outline"} title="Je suis un patient"
                    titleStyle={styles.btnTitleStyle}
                    buttonStyle={styles.btnStyle}
                    TouchableComponent={TouchableOpacity}
                    onPress={() => { navigation.navigate('patient') }}
                />
                <Button type={"outline"} title="Je suis un medecin"
                    titleStyle={styles.btnTitleStyle}
                    buttonStyle={styles.btnStyle}
                    TouchableComponent={TouchableOpacity}
                    onPress={() => { navigation.navigate('medecin') }}
                />
            </View>

        </View>
    )
}

export default UserTypeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 50,
        justifyContent: 'space-around'
    },
    img: { width: '90%', height: '40%', resizeMode: 'contain' },
    btnTitleStyle: {
        fontSize: 14,
        fontFamily: 'PoppinsSemiBold'
    },
    btnStyle: {
        borderRadius: 25,
        borderColor: colors.light, width: "100%",
        borderWidth: 2,
        marginVertical: 10
    },
    title: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 20,
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'PoppinsLight',
        fontSize: 14,
        textAlign: 'center'
    }
})
