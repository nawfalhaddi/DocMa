import React from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import AlertComponent from '../../components/medecin/AlertComponent'

const MedecinPatientConsultationsScreen = (props) => {
    return (
        <View style={styles.screen}>
            <SafeAreaView style={styles.ListContainer}>
                <FlatList
                    data={props.patientAlertes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return <AlertComponent item={item} showProfile={false} />
                    }}
                />
            </SafeAreaView>
        </View >
    )
}

export default MedecinPatientConsultationsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: "90%",
        alignSelf: 'center'
    },
    ListContainer: { marginBottom: 30 }
})
