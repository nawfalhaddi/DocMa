import React, { useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import colors from '../../constants/colors'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
// import * as RootNavigation from '../../navigation/RootNavigator'

const CustomHeader = (props) => {
    const [selectedItem, setSelectedItem] = useState(1)

    return (
        <View style={styles.screen}>
            <View style={styles.headercontainer}>
                <Text style={styles.headerTitle}>{props.name}</Text>
            </View>
            <View style={styles.circlesContainer}>
                <View style={styles.circleAndTextContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.circleContainer} onPress={() => {
                        setSelectedItem(1);
                        props.firstItemFunc();
                    }}>
                        <Icon color={selectedItem === 1 ? colors.primary : colors.grey} containerStyle={styles.circle} name={props.firstItemIcon} size={30} />
                    </TouchableOpacity>
                    <Text style={{ ...styles.circleText, color: selectedItem === 1 ? colors.primary : colors.grey, fontSize: selectedItem === 1 ? 17 : 14 }}>{props.firstItemTitle}</Text>
                </View>

                <View style={styles.circleAndTextContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.circleContainer} onPress={() => {
                        setSelectedItem(2);
                        props.secondItemFunc();

                    }}>
                        <Icon color={selectedItem === 2 ? colors.primary : colors.grey} containerStyle={styles.circle} name={props.secondItemIcon} size={30} />
                    </TouchableOpacity>
                    <Text style={{ ...styles.circleText, color: selectedItem === 2 ? colors.primary : colors.grey, fontSize: selectedItem === 2 ? 17 : 14 }}>{props.secondItemTitle}</Text>
                </View>

                <View style={styles.circleAndTextContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.circleContainer} onPress={() => {
                        setSelectedItem(3)
                        props.thirdItemFunc();


                    }}>
                        <Icon color={selectedItem === 3 ? colors.primary : colors.grey} containerStyle={styles.circle} name={props.thirdItemIcon} size={30} />
                    </TouchableOpacity>
                    <Text style={{ ...styles.circleText, color: selectedItem === 3 ? colors.primary : colors.grey, fontSize: selectedItem === 3 ? 17 : 14 }}>{props.thirdItemTitle}</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headercontainer: {
        backgroundColor: colors.primary,
        height: 100,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        zIndex: 0
    },
    headerTitle: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17,
        color: 'white',
        marginLeft: 35,
        marginTop: 35
    },
    circleContainer: {
        height: 75,
        width: 75,
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 11 },
        shadowRadius: 35,
        elevation: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circlesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 3,
        marginTop: -30
    },
    circleText: {
        fontFamily: 'PoppinsSemiBold',
        marginTop: 10
    },
    circleAndTextContainer: {
        alignItems: 'center'
    },
    screen: {
        backgroundColor: Platform.OS === 'ios' ? '#f2f2f2' : null
    }

})
