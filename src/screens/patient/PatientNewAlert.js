import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import colors from '../../constants/colors';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import * as patientActions from '../../store/actions/patient';
import * as Location from 'expo-location';


const validationSchema = yup.object().shape({
    douleur: yup.number().required('champ obligatoire').max(10, 'La valeur maximale est 10'),
    temperature: yup.number().required('champ obligatoire'),
    bpm: yup.number().required('champ obligatoire'),
    tension: yup.string().required('champ obligatoire')
});

const PatientNewAlert = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [responseError, setResponseError] = useState(false)
    const [response, setResponse] = useState(null)
    const [location, setLocation] = useState(null);

    const patientId = useSelector(state => state.patient.id);
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            let location = null
            if (status === 'granted') {
                location = await Location.getCurrentPositionAsync({});
            }
            setLocation(location);
        })();
    }, [props.navigation]);

    const submitHandler = async (values) => {
        try {
            let longitude = "";
            let latitude = "";
            if (location) {
                longitude = location.coords.latitude;
                latitude = location.coords.longitude;
            }
            let payload = { ...values, longitude: longitude, latitude: latitude };
            await dispatch(patientActions.addAlert(payload));
            setIsLoading(false);
            setResponse('Alerte est ajoutée')

        } catch (error) {
            setResponseError('Erreur en ajout d\'alerte');
            setIsLoading(false);
        }


    }

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback style={{ height: '100%' }} onPress={() => Keyboard.dismiss()}>


                <Text style={styles.titre}>Nouvelle alerte</Text>
                <ScrollView>
                    <Formik
                        initialValues={{ douleur: '', temperature: '', bpm: '', tension: '' }}
                        onSubmit={(values, actions) => {
                            setIsLoading(true);
                            actions.resetForm();
                            submitHandler(values);
                        }}
                        validationSchema={validationSchema}
                    >
                        {formikProps => (
                            <View>
                                <View style={styles.formControl}>
                                    <Text style={styles.formLabel}>Degré de douleur:</Text>
                                    <TextInput style={styles.formInput}
                                        onBlur={formikProps.handleBlur('douleur')}
                                        onChangeText={formikProps.handleChange('douleur')}
                                        value={formikProps.values.douleur}
                                        placeholder="Entre 0-10"
                                        keyboardType="numeric"
                                    />
                                    {formikProps.touched.douleur && formikProps.errors.douleur ? <Text style={styles.errorMessage}>{formikProps.errors.douleur}</Text> : null}
                                </View>
                                <View style={styles.formControl}>
                                    <Text style={styles.formLabel}>Température:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onChangeText={formikProps.handleChange('temperature')}
                                        onBlur={formikProps.handleBlur('temperature')}
                                        value={formikProps.values.temperature}
                                        placeholder="Exemple: 37"
                                        keyboardType="numeric"

                                    />
                                    {formikProps.touched.temperature && formikProps.errors.temperature ? <Text style={styles.errorMessage}>{formikProps.errors.temperature}</Text> : null}
                                </View>
                                <View style={styles.formControl}>
                                    <Text style={styles.formLabel}>Les battements par minute de votre coeur:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onChangeText={formikProps.handleChange('bpm')}
                                        onBlur={formikProps.handleBlur('bpm')}
                                        value={formikProps.values.bpm}
                                        placeholder="Exemple: 60"
                                        keyboardType="numeric"

                                    />
                                    {formikProps.touched.bpm && formikProps.errors.bpm ? <Text style={styles.errorMessage}>{formikProps.errors.bpm}</Text> : null}
                                </View>
                                <View style={{ ...styles.formControl, marginBottom: 30 }}>
                                    <Text style={styles.formLabel}>Tension:</Text>
                                    <TextInput
                                        style={styles.formInput}
                                        onChangeText={formikProps.handleChange('tension')}
                                        onBlur={formikProps.handleBlur('tension')}
                                        value={formikProps.values.tension}
                                        placeholder="Exemple 120/90"
                                        keyboardType="default"

                                    />
                                    {formikProps.touched.tension && formikProps.errors.tension ? <Text style={styles.errorMessage}>{formikProps.errors.tension}</Text> : null}
                                </View>
                                <Button title='Envoyer'
                                    titleStyle={styles.btnTitle}
                                    buttonStyle={styles.btnStyle}
                                    onPress={() => {
                                        formikProps.handleSubmit();
                                    }}
                                    loading={isLoading}
                                />
                                {responseError && <Text style={{ ...styles.errorMessage, textAlign: 'center' }}>{responseError}</Text>}
                                {response && <Text style={{ ...styles.errorMessage, textAlign: 'center', color: 'green' }}>{response}</Text>}

                            </View>
                        )}


                    </Formik>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default PatientNewAlert

const styles = StyleSheet.create({
    titre: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14,
        textAlign: 'center'
    },
    screen: {
        flex: 1,
        paddingHorizontal: 10
    },
    formControl: {
        marginTop: 10
    },
    formLabel: {
        fontSize: 14,
        fontFamily: 'PoppinsRegular'
    },
    formInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        fontSize: 17,
        paddingLeft: 10,
        fontFamily: 'PoppinsRegular',
        paddingHorizontal: 5
    },
    btnTitle: {
        fontSize: 14,
        fontFamily: 'PoppinsSemiBold'
    },
    btnStyle: {
        borderRadius: 25,
        backgroundColor: colors.primary,
    },
    errorMessage: {
        fontSize: 10,
        fontFamily: 'PoppinsLight',
        color: 'red'
    }
})
