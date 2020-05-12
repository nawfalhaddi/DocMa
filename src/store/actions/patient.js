import { PATIENTLOGOUT, PATIENTLOGIN, ADDALERT } from '../types'
import { AsyncStorage } from 'react-native';
import Alerte from '../../models/alerte';
import { patients, alertes } from '../../data/dummyData';
import axios from '../../axios/index'

export const login = (accessCode) => {
    return async dispatch => {
        return await axios.post('/patient/login', {
            access_code: accessCode,
        }).then(async (response) => {
            const patientAlertes = await axios.post('/patient/patientAlertes', { id: response.data.id });
            let alerteArray = Object.values(patientAlertes.data);
            let alertePatient = [];
            alerteArray.map((item) => {
                let singleAlerte = new Alerte(item.id, item.id_medecin, item.id_patient, item.longitude, item.latitude, item.date, item.nbr_battement, item.degre_douleur, item.tension, item.temperature, item.remarque, item.date_traitement, item.file_ordonance, item.vu_medecin, item.vu_patient);

                alertePatient.push(singleAlerte);
            })

            const payload = {
                id: response.data.id,
                firstName: response.data.fname,
                lastName: response.data.lname,
                accessCode: response.data.access_code,
                alertes: alertePatient
            }
            dispatch({ type: PATIENTLOGIN, payload: payload });
            saveDataToStorage(payload);

        }).catch((error) => {
            throw new Error(error.response.data);
        })
    }


}

export const addAlert = (values) => {
    const douleur = parseInt(values.douleur);
    const temperature = parseInt(values.temperature);
    const bpm = parseInt(values.bpm);
    const data = values;

    return async (dispatch, getState) => {
        patientId = getState().patient.id;

        return await axios.post('/patient/ajoutAlerte', {
            id_patient: patientId,
            id_medecin: 1,
            longitude: data.longitude,
            latitude: data.latitude,
            nbr_battement: bpm,
            degre_douleur: douleur,
            tension: data.tension,
            temperature: temperature

        }).then(response => {
            let item = response.data
            let alert = new Alerte(item.id, item.id_medecin, item.id_patient, item.longitude, item.latitude, item.date, item.nbr_battement, item.degre_douleur, item.tension, item.temperature, item.remarque, item.date_traitement, item.file_ordonance, item.vu_medecin, item.vu_patient);

            dispatch({ type: ADDALERT, payload: alert });
        }).catch((error) => {
            throw new Error(error.response.data);
        })

    }
}

const saveDataToStorage = (payload) => {
    AsyncStorage.setItem('patientData', JSON.stringify({
        accessCode: payload.accessCode
    }))
}

export const logout = () => {
    AsyncStorage.removeItem('patientData');

    return { type: PATIENTLOGOUT }
}