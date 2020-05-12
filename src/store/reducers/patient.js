import { PATIENTLOGIN, PATIENTLOGOUT } from '../types';
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

        default:
            return state;
    }
}