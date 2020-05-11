class Alerte {
    constructor(id, idMedecin, idPatient, longitude, latitude, date, nbrBattement, douleurDegre, tension, temperature, remarque, dateTraitement, fileOrdonance, vuMedecin, vuPatient) {
        this.id = id;
        this.idMedecin = idMedecin;
        this.idPatient = idPatient;
        this.longitude = longitude;
        this.latitude = latitude;
        this.date = date;
        this.nbrBattement = nbrBattement;
        this.douleurDegre = douleurDegre;
        this.tension = tension;
        this.temperature = temperature;
        this.remarque = remarque;
        this.dateTraitement = dateTraitement;
        this.fileOrdonance = fileOrdonance;
        this.vuMedecin = vuMedecin;
        this.vuPatient = vuPatient;
    }
}

export default Alerte;