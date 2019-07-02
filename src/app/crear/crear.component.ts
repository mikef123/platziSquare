import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { debug } from 'util';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html'
})
export class CrearComponent {
    lugar: any = {};
    id: any = null;
    private searchField: FormControl;
    results$: Observable<any>;
    constructor(private lugarService: LugaresService, private route: ActivatedRoute, private http:HttpClient) {
        this.id = this.route.snapshot.params['id'];
        if (this.id !== 'new') {
            this.lugarService.getLugar(this.id)
                .valueChanges().subscribe((lugar) => {
                    this.lugar = lugar;
                });
        }
        const URL = 'https://maps.google.com/maps/api/geocode/json';
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges
        .debounceTime(1000)
        .switchMap(query => this.http.get(`${URL}?address=${query}&key=AIzaSyAokeFPjsGUD9OElN1-By5fDCZsXBo3Mt8`))
        .map((response:any) => {
           return response.results
        })
        
    };
    guardarLugar() {
        let direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
        this.lugarService.obtenerGeoData(direccion)
            .subscribe((result: any) => {
                this.lugar.lat = result.results[0].geometry.location.lat;
                this.lugar.lng = result.results[0].geometry.location.lng;
                if (this.id !== 'new') {
                    this.lugarService.editarLugar(this.lugar);
                    alert('Negocio modificado con éxito!');
                }
                else {
                    this.lugar.id = Date.now().toString();;
                    this.lugarService.guardarLugar(this.lugar);
                    alert('Negocio guardado con éxito!');
                }
                this.lugar = {};
            });
    };
    seleccionarDireccion(direccion){
        console.log(direccion);
        this.lugar.calle = direccion.address_components[1].long_name+ ' '+ direccion.address_components[0].long_name;
        this.lugar.ciudad=direccion.address_components[4].long_name;
        this.lugar.pais = direccion.address_components[6].long_name;
    }
}