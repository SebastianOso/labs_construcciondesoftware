const db = require('../util/database')

const personajes = [];

module.exports = class Personaje {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre) {
        this.nombre = mi_nombre;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        //ejecuta la promesa, le manda al servidor de la base de datos 
        // hace la consulta inserta el nombre, pero como es codigo asincrono una manera de manejarlas se manejan con then() y catch
        return db.execute('INSERT INTO personajes(nombre) VALUES(?)', [this.nombre]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM personajes');
    }

    static fetchOne(id){
        return db.execute('SELECT * FROM personajes WHERE id=?', [id]);
    }

    static fetch(id){
        if (id) {
            return fetchOne(id);
        } else {
            return fetchAll();
        }
    }

}