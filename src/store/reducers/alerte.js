import { alertes } from '../../data/dummyData'
import { FETCH_ALERTS, ADD_RESPONSE } from '../types';
import Alerte from '../../models/alerte';
const initialState = {
    // alertes: alertes.filter(item => item.idMedecin === 4)
    alertes: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_ALERTS:
            return {
                ...state,
                alertes: actions.payload
            }
        case ADD_RESPONSE:
            alertIndex = state.alertes.findIndex(item => item.id === actions.payload.id);
            newAlert = state.alertes[alertIndex];
            newAlert.remarque = actions.payload.remarque;
            newAlert.vuMedecin = 1;
            updatedAlerts = [...state.alertes];
            updatedAlerts[alertIndex] = newAlert;
            return {
                ...state,
                alertes: updatedAlerts
            }

        default:
            return state;
    }
}