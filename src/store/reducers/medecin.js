import { patients } from '../../data/dummyData'
import { MEDECINLOGOUT, MEDECINLOGIN } from '../types'
const initialState = {
    token: null,
    id: 4,
    firstName: "Mohamed Bakkali",
    lastName: "",
    email: "drbakkali@gmail.com",
    patients: patients,
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case MEDECINLOGIN:
            return {
                ...state,
                id: actions.payload.medecinId,
                firstName: actions.payload.medecinName,
                lastName: "",
                email: actions.payload.medecinEmail,
                patients: actions.payload.medecinPatient,
                token: actions.payload.token
            }
        case MEDECINLOGOUT:
            return {
                id: null,
                firstName: null,
                lastName: "",
                email: null,
                patients: null,
                token: null,
            }
        default:
            return state;
    }
}