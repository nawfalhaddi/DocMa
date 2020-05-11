import { patients } from '../../data/dummyData'
import { } from '../types'
const initialState = {
    id: 4,
    firstName: "Mohamed",
    lastName: "Daoudi",
    email: "drdaoudi@gmail.com",
    patients: patients,
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        default:
            return state;
    }
}