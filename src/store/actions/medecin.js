import { MEDECINLOGIN, MEDECINLOGOUT } from '../types'
import { AsyncStorage } from 'react-native';
import Patient from '../../models/patient';
import { patients } from '../../data/dummyData';
import axios from '../../axios/index'


export const login = (email, password) => {
    return async dispatch => {
        return await axios.post('/login', {
            email: email,
            password: password,
        }).then(async (response) => {

            const user = await axios.get(`/auth/user?token=${response.data.access_token}`);

            const patients = await axios.get(`/auth/medecinPatients?token=${response.data.access_token}`);

            let patientArray = [];
            patients.data.map((item) => {
                let singlePatient = new Patient(item.id, item.fname, item.lname, item.access_code, item.active);
                patientArray.push(singlePatient);
            })

            const payload = {
                token: response.data.access_token,
                medecinId: user.data.id,
                medecinName: user.data.name,
                medecinEmail: user.data.email,
                medecinPassword: password,
                medecinPatient: patientArray
            }
            dispatch({ type: MEDECINLOGIN, payload: payload });
            const expirationDate = new Date(new Date().getTime() + parseInt(response.data.expires_in) * 1000);
            saveDataToStorage(payload, expirationDate);

        }).catch((error) => {
            throw new Error(error.response.data.error);
        })
    }


}

export const authenticate = (payload) => {
    const medecinEmail = payload.medecinEmail
    const medecinPassword = payload.medecinPassword
    login(medecinEmail, medecinPassword);
}

export const logout = () => {
    clearDataFromStorage();
    return { type: MEDECINLOGOUT }
}

const saveDataToStorage = (payload, expirationDate) => {
    AsyncStorage.setItem('medecinData', JSON.stringify({
        token: payload.token,
        id: payload.medecinId,
        name: payload.medecinName,
        email: payload.medecinEmail,
        password: payload.medecinPassword,
        patients: payload.medecinPatient,
        expiryDate: expirationDate.toISOString(),
    }))
}

const clearDataFromStorage = () => {
    AsyncStorage.removeItem('medecinData');
}