import { Injectable } from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
@Injectable()
export class LugaresService {
    lugares: any = [
        { id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería la Gardenia', description: 'descripcion de este negocio. Más adelante se publicará la información'},
        { id: 2, plan: 'pagado', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita', description: 'descripcion de este negocio. Más adelante se publicará la información'},
        { id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices', description: 'descripcion de este negocio. Más adelante se publicará la información'},
        { id: 4, plan: 'pagado', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Suhiroll', description: 'descripcion de este negocio. Más adelante se publicará la información'},
        { id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia', description: 'descripcion de este negocio. Más adelante se publicará la información'},
        { id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el Clavo', description: 'descripcion de este negocio. Más adelante se publicará la información' }
    ];
    constructor(private afDB:AngularFirestore) {

    }
    public getLugares() {
        return this.lugares;
    }
    public buscarLugar(id) {
        return this.lugares.filter((lugar) => { return lugar.id == id })[0] || null;
    }
    public guardarLugar(lugar) {
        console.log(lugar);
        this.afDB.collection('lugares').doc('1').set(lugar);
        // this.afDB.collection('lugares').add(lugar);

    }
}