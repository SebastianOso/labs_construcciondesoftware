const personajes = [];

module.exports = class Personaje {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(my_value) {
        this.nombre = mi_nombre;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        personajes.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return personajes     
    }

}