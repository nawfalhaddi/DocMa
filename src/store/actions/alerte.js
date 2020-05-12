import { FETCH_ALERTS, ADD_RESPONSE } from '../types';
import Alerte from '../../models/alerte'
import axios from '../../axios';

export const fetchAlerts = () => {
    return async (dispatch, getState) => {
        const token = getState().medecin.token;
        return await axios.get(`/auth/medecinAlertes?token=${token}`)
            .then(response => {
                let payload = []
                response.data.map(item => {
                    let alert = new Alerte(item.id, item.id_medecin, item.id_patient, item.longitude, item.latitude, item.date, item.nbr_battement, item.degre_douleur, item.tension, item.temperature, item.remarque, item.date_traitement, item.file_ordonance, item.vu_medecin, item.vu_patient);
                    payload.push(alert);
                });
                dispatch({ type: FETCH_ALERTS, payload: payload });
            }).catch(error => {
                throw new Error();
            })
    }
}


export const addResponse = (remarque, alertId) => {

    return async (dispatch, getState) => {
        const token = getState().medecin.token;
        return await axios.post('/auth/ajoutReponse', { id: alertId, remarque: remarque, token: token }).then(response => {
            dispatch({ type: ADD_RESPONSE, payload: { id: alertId, remarque: remarque } });
            return;
        }).catch(error => {
            throw new Error('Erreur');
        })
    }
}