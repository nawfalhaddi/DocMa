import Alerte from '../models/alerte'
import Patient from '../models/patient'

export const alertes = [
    new Alerte(1, 4, 1, '35.768965', '-5.889576', "2019-06-13", "70", 4, "140/90", 39.89, "Lorem ipsum ozal slna ozuna hjska lala", "2019-06-13", "/public/test/shs.jpg", 1, 0),
    new Alerte(2, 4, 2, '35.768965', '-5.889576', "2019-07-13", "70", 9, "120/90", 40.00, "", "2019-07-13", "/public/test/shs.jpg", 0, 0),
    new Alerte(3, 4, 3, '35.768965', '-5.889576', "2019-08-11", "70", 8, "130/90", 37.56, "Lorem ipsum ozal slna ozuna hjska lala", "2019-08-11", "/public/test/shs.jpg", 1, 1),
    new Alerte(4, 4, 1, '35.768965', '-5.889576', "2019-09-11", "70", 5, "140/90", 33.67, "", "2019-09-11", "/public/test/shs.jpg", 0, 0),
    new Alerte(5, 4, 1, '35.768965', '-5.889576', "2019-10-11", "70", 5, "140/90", 40, "", "2019-10-11", "/public/test/shs.jpg", 0, 0),
]

export const patients = [
    new Patient(1, "Nizar", "Bakkali", "123456", 1),
    new Patient(2, "hicham", "berada", "888888", 1),
    new Patient(3, "Wafae", "Filali", "232323", 1),

]