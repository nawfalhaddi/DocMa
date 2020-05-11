import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import moment from 'moment';
import 'moment/locale/fr';
import {
    LineChart,
} from "react-native-chart-kit";

const MedecinPatientEvolutionScreen = (props) => {
    const patient = props.patient
    const alertes = useSelector(state => state.alertes.alertes.filter(item => item.idPatient === patient.id))
    let labels = [];
    let data = [];
    console.log(moment("2019-06-11").locale('fr').format("Do MMM"));
    alertes.map((item) => {
        labels.unshift(moment(item.date).locale('fr').format("Do MMM"));
        data.unshift(item.temperature);
    })

    return (
        <View style={styles.screen}>
            <Text style={styles.chartTitle}>Evolution: Température / Temps</Text>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: data
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 50} // from react-native
                height={220}
                // yAxisLabel=""
                yAxisSuffix="°"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 20,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#000"
                }}
            />
        </View>
    )
}

export default MedecinPatientEvolutionScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
    },
    chartTitle: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 18,
        marginTop: 10
    }
})
