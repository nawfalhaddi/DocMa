import { combineReducers } from 'redux';
import medecinReducer from './medecin'
import patientReducer from './patient'
import alerteReducer from './alerte'

const rootReducers = combineReducers({
    medecin: medecinReducer,
    patient: patientReducer,
    alertes: alerteReducer
})


export default rootReducers;