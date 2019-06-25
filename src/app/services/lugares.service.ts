import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LugaresService {
    lugares: any = [
        { id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería la Gardenia', description: 'descripcion de este negocio. Más adelante se publicará la información' },
        { id: 2, plan: 'pagado', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita', description: 'descripcion de este negocio. Más adelante se publicará la información' },
        { id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices', description: 'descripcion de este negocio. Más adelante se publicará la información' },
        { id: 4, plan: 'pagado', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Suhiroll', description: 'descripcion de este negocio. Más adelante se publicará la información' },
        { id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia', description: 'descripcion de este negocio. Más adelante se publicará la información' },
        { id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el Clavo', description: 'descripcion de este negocio. Más adelante se publicará la información' }
    ];
    constructor(private afDB: AngularFirestore, private http: HttpClient) {

    }
    public getLugares() {
        return this.afDB.collection('lugares/').valueChanges();
    }
    public buscarLugar(id) {
        return this.lugares.filter((lugar) => { return lugar.id == id })[0] || null;
    }
    public guardarLugar(lugar) {
        this.afDB.collection('lugares').doc(lugar.id).set(lugar);
    }
    public editarLugar(lugar) {
        this.afDB.collection('lugares').doc(lugar.id).set(lugar);
    }
    public obtenerGeoData(direccion) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAokeFPjsGUD9OElN1-By5fDCZsXBo3Mt8&address=' + direccion);
    }
    public getLugar(id) {
        return this.afDB.collection('lugares').doc(id);
    }
}