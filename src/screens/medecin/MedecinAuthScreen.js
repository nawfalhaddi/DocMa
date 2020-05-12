import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { headerOptions, commonStyle } from '../../styles/index'
import { Card, Button } from 'react-native-elements';
import { Formik } from 'formik';
import colors from '../../constants/colors';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import * as medecinActions from '../../store/actions/medecin';


const validationSchema = yup.object().shape({
    email: yup.string().email('Entrez un email valide').required('Email est obligatoire'),
    password: yup.string().required('Mot de passe est obligatoire').min(6, 'Mot de passe doit avoir 6 caractères au minimum')
});

const MedecinAuthScreen = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Je suis Medecin",
            ...headerOptions
        });
    }, [navigation]);


    const authHandler = async (email, password) => {
        try {
            await dispatch(medecinActions.login(email, password));
        } catch (error) {
            setIsLoading(false);
            setErrMessage(error.message);
        }

    }


    return (
        <ScrollView>
            <TouchableOpacity style={{ height: '100%' }} onPress={Keyboard.dismiss} activeOpacity={1}>
                <View style={styles.screen}>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.title}>Connexion</Text>
                    </View>
                    <Text style={styles.subTitle}>Veuillez introduire votre adresse email et votre mot de passe.</Text>
                    <KeyboardAvoidingView style={{ width: "100%" }} behavior={Platform.Os == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values) => {
                                setIsLoading(true);
                                setErrMessage(null);
                                authHandler(values.email, values.password);

                            }}
                            validationSchema={validationSchema}
                        >
                            {formikProps => (
                                <Card containerStyle={styles.card}>
                                    <View style={styles.formControl}>
                                        <Text style={styles.formLabel}>Email:</Text>
                                        <TextInput
                                            onBlur={formikProps.handleBlur('email')}
                                            onChangeText={formikProps.handleChange('email')}
                                            value={formikProps.values.email}
                                            keyboardType="email-address"
                                            style={styles.formInput}
                                            autoCapitalize='none'
                                        />
                                        {formikProps.touched.email && formikProps.errors.email ? <Text style={styles.errorMessage}>{formikProps.errors.email}</Text> : null}
                                    </View>
                                    <View style={styles.formControl}>
                                        <Text style={styles.formLabel}>Mot de passe:</Text>
                                        <TextInput
                                            onBlur={formikProps.handleBlur('password')}
                                            onChangeText={formikProps.handleChange('password')}
                                            value={formikProps.values.password}
                                            keyboardType="default"
                                            secureTextEntry
                                            style={styles.formInput}
                                            autoCapitalize='none'
                                        />
                                        {formikProps.touched.password && formikProps.errors.password ? <Text style={styles.errorMessage}>{formikProps.errors.password}</Text> : null}
                                    </View>
                                    <View style={styles.formControl}>
                                        <Button title="Se connecter" titleStyle={commonStyle.btnStyle} buttonStyle={commonStyle.btnBoddyStyle}
                                            TouchableComponent={TouchableOpacity}
                                            onPress={formikProps.handleSubmit}
                                            loading={isLoading}
                                        />
                                        {errMessage && <Text style={{ ...styles.errorMessage, textAlign: 'center', marginTop: 10 }}>{errMessage}</Text>}
                                    </View>
                                </Card>
                            )}

                        </Formik>
                    </KeyboardAvoidingView>

                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default MedecinAuthScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17,
        textAlign: 'center',

    },
    subTitle: {
        fontFamily: 'PoppinsLight',
        fontSize: 12,
        color: '#898A8F',
        textAlign: 'center',
        width: '70%'
    },
    card: {
        borderRadius: 25,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 30,
        elevation: 3,
        width: '90%',
        marginBottom: 15
    },
    formControl: {
        marginVertical: 5
    },
    formLabel: {
        fontFamily: 'PoppinsRegular',
        color: colors.grey,
        fontSize: 15
    },
    formInput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ECECEC',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 15,
        padding: 5
    },
    errorMessage: {
        fontFamily: 'PoppinsLight',
        color: 'red'
    }
})
