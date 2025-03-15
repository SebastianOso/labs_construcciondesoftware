const db = require('../util/database');

module.exports = class Nivel {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nivel) {
        this.nivel = mi_nivel;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO niveles(nombre) VALUES (?)', [this.nivel]);
    }

    static fetchAll() {
            return db.execute('SELECT * FROM niveles');
        }
    
        static fetchOne(id) {
            return db.execute('SELECT * FROM niveles WHERE id=?', [id]);
        }
    
        static fetch(id) {
            if (id) {
                return this.fetchOne(id);
            } else {
                return this.fetchAll();
            }
        }

}