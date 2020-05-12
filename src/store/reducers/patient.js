import { PATIENTLOGIN, PATIENTLOGOUT, ADDALERT } from '../types';
import { alertes } from '../../data/dummyData';
const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    accessCode: null,
    alertes: []
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case PATIENTLOGIN:
            return {
                ...state,
                id: actions.payload.id,
                firstName: actions.payload.firstName,
                lastName: actions.payload.lastName,
                accessCode: actions.payload.accessCode,
                alertes: actions.payload.alertes
            }
        case PATIENTLOGOUT:
            return {
                ...state,
                id: null,
                firstName: null,
                lastName: null,
                accessCode: null,
                alertes: []
            }
        case ADDALERT:
            return {
                ...state,
                alertes: state.alertes.concat(actions.payload)
            }

        default:
            return state;
    }
}