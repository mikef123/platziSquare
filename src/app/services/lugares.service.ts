import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LugaresService {
    lugares: any = {};
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