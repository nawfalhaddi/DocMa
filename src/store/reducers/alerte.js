import { alertes } from '../../data/dummyData'
const initialState = {
    alertes: alertes.filter(item => item.idMedecin === 4)
}

export default (state = initialState, actions) => {
    switch (actions.type) {

        default:
            return state;
    }
}