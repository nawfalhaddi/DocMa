import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import { Button, Card } from 'react-native-elements'
import AlertComponent from '../../components/medecin/AlertComponent'
import { useSelector } from 'react-redux';

const MedecinConsultationsScreen = (props) => {
    const [selectedItem, setSelectedItem] = useState(1);

    let alertes = useSelector(state => state.alertes.alertes.sort((a, b) => a.id < b.id));

    let alertesEnAttente = useSelector(state => state.alertes.alertes.filter(item => item.vuMedecin === 0).sort((a, b) => a.id < b.id))

    let alertesTermine = useSelector(state => state.alertes.alertes.filter(item => item.vuMedecin === 1).sort((a, b) => a.id < b.id))

    return (
        <View style={styles.screen}>

            <View style={styles.btnsContainer}>
                <View style={{ ...styles.btnContainer }}>

                    <Button type={selectedItem === 1 ? "solid" : "clear"} title="Tous" titleStyle={{ ...styles.btnTitleStyle, color: "black" }} buttonStyle={{ ...styles.btnBodyStyle, backgroundColor: selectedItem === 1 ? 'white' : null }}
                        onPress={() => { setSelectedItem(1) }}
                    />
                </View>
                <View style={styles.btnContainer}>

                    <Button type={selectedItem === 2 ? "solid" : "clear"} title="En attente" titleStyle={{ ...styles.btnTitleStyle, color: selectedItem === 2 ? 'white' : 'red' }} buttonStyle={{ ...styles.btnBodyStyle, backgroundColor: selectedItem === 2 ? 'red' : null }}
                        onPress={() => { setSelectedItem(2) }}
                    />
                </View>
                <View style={styles.btnContainer}>

                    <Button type={selectedItem === 3 ? "solid" : "clear"} title="Terminé" titleStyle={{ ...styles.btnTitleStyle, color: selectedItem === 3 ? 'white' : '#71CD7F' }} buttonStyle={{ ...styles.btnBodyStyle, backgroundColor: selectedItem === 3 ? '#71CD7F' : null }}
                        onPress={() => { setSelectedItem(3) }}
                    />
                </View>
            </View>
            <View>
                <SafeAreaView style={styles.ListContainer}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={selectedItem === 1 ? alertes : selectedItem === 2 ? alertesEnAttente : alertesTermine}
                        renderItem={(item) => (<AlertComponent {...item} showProfile={true} />)}
                    />
                </SafeAreaView>
            </View>

        </View>

    )
}

export default MedecinConsultationsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10
    },
    ListContainer: {
        marginBottom: 30
    },
    btnsContainer: {
        flexDirection: 'row',
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10
    },
    btnTitleStyle: {
        fontFamily: 'PoppinsLight',
        fontSize: 12,
        margin: 0,
    },
    btnBodyStyle: {
        borderRadius: 20,
        padding: 0,
    },
    btnContainer: {
        width: "30%"
    },
    gap: {
        height: 100
    }
})