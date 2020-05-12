import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Keyboard, Platform } from 'react-native';
import colors from '../../constants/colors';
import { headerOptions, commonStyle } from '../../styles/index'
import { Card, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as patientActions from '../../store/actions/patient';


const PatientAuthScreen = (props) => {
    const CELL_COUNT = 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const dispatch = useDispatch();
    const [customProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Je suis patient",
            ...headerOptions
        });
    }, [navigation]);
    const authHandler = async (code) => {
        try {
            await dispatch(patientActions.login(code));
        } catch (error) {
            setIsLoading(false);
            setErrMessage(error.message);
        }

    }



    return (
        <TouchableOpacity style={{ height: '100%' }} onPress={Keyboard.dismiss} activeOpacity={1}>


            <View style={styles.screen}>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.title}>Insérez le code</Text>
                    <Text style={styles.stars}>* * * * * *</Text>
                </View>
                <Text style={styles.subTitle}>Votre médecin vous a envoyé par SMS, un code de connexion contenant 6 chiffres.</Text>
                <Formik
                    initialValues={{ code: '' }}
                    onSubmit={(values) => {
                        setIsLoading(true);
                        setErrMessage(null);
                        authHandler(values.code);
                        setValue('');
                    }}

                >
                    {formikProps => (
                        <Card containerStyle={styles.card}>
                            <View>
                                <CodeField
                                    ref={ref}
                                    {...customProps}
                                    value={value}
                                    onChangeText={(value) => {
                                        setValue(value);
                                    }}
                                    cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFiledRoot}
                                    keyboardType="number-pad"
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}

                                />


                            </View>
                            <Button title="Se connecter" titleStyle={commonStyle.btnStyle} buttonStyle={commonStyle.btnBoddyStyle} onPress={() => {
                                formikProps.values.code = value;
                                formikProps.handleSubmit();
                            }}
                                loading={isLoading}
                            />
                            {errMessage && <Text style={{ ...styles.errorMessage, textAlign: 'center', marginTop: 10 }}>{errMessage}</Text>}

                        </Card>
                    )}

                </Formik>




            </View>
        </TouchableOpacity>
    )
}

export default PatientAuthScreen

const styles = StyleSheet.create({
    codeFiledRoot: {
        marginVertical: 20,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderWidth: Platform.OS === 'ios' ? 2 : 0,
        borderColor: '#00000030',
        textAlign: 'center',
        marginHorizontal: 5
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    card: {
        borderRadius: 25,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 30,
        elevation: 5
    },

    title: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 17,
        textAlign: 'center'
    },
    stars: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 27,
        color: '#27AE60',
        textAlign: 'center'

    },
    subTitle: {
        fontFamily: 'PoppinsLight',
        fontSize: 12,
        color: '#898A8F',
        textAlign: 'center',
        width: '80%'
    },
    errorMessage: {
        fontFamily: 'PoppinsLight',
        color: 'red'
    }
})
